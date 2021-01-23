const express = require('express');
const meritController = express.Router();
const passport = require('passport');

const Merit = require('./merit');
const Brother = require('../brothers/brother');
const { PositionEnum } = require('../util/enums/brother-enums');
const { MeritOperationEnum } = require('../util/enums/merit-enums');

// Passport.js config (JWT extracttion from request headers)
meritController.use(passport.initialize());
require('../../../config/passport')(passport);

// Helper function: checks if user in JWT has access to an endpoint
const checkIfUserEndpointAccess = (
  requestObject,
  responseObject,
  positionsWithAccess
) => {
  let hasAccess = false;
  positionsWithAccess.forEach((position) => {
    if (position === requestObject.user.position) hasAccess = true;
  });

  if (!hasAccess) {
    return responseObject.status(403).json({
      message: `Forbidden: API endpoint only for use of: ${positionsWithAccess.toString()}`,
    });
  }
  return hasAccess;
};

/**
 * GET Endpoint (all merits for pledge parent dashboard view)
 * @route GET api/merits
 * @desc retrieve all merit payloads
 */
meritController.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Check if JWT sent in request is pledge parent or webmaster
    checkIfUserEndpointAccess(req, res, [
      PositionEnum.PLEDGE_PARENT,
      PositionEnum.WEBMASTER,
    ]);

    Merit.find({}, (error, allMerits) => {
      if (error) {
        return res
          .status(404)
          .json({ message: `No merit payloads found: ${error}` });
      }
      const response = {
        pending: [],
        dispatched: [],
      };
      allMerits.forEach((merit) => {
        if (merit.isDispatched) {
          response.dispatched.push(merit);
        } else {
          response.pending.push(merit);
        }
      });
      res.status(200).json(response);
    });
  }
);

/**
 * PUT Endpoint (approve/disapprove pending merit requests from actives)
 * @route PUT api/merits
 * @desc dispatch the pending merit request (approve or disapprove it), and fulfill mutation to pledge if approved
 */
meritController.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Check if JWT sent in request is pledge parent or webmaster
    checkIfUserEndpointAccess(req, res, [
      PositionEnum.PLEDGE_PARENT,
      PositionEnum.WEBMASTER,
    ]);

    const { isMeritApproved, meritPayload } = req.body;
    const { meritObjectID, pledgeID, operation } = meritPayload;

    // If pledge parent sees that merit request by active is legit, increment/decrement merit count from pledge
    if (isMeritApproved) {
      const pledgeObject = await Brother.findById(pledgeID);

      if (pledgeObject && operation === MeritOperationEnum.INCREMENT) {
        pledgeObject.meritCount += 1;
      } else if (pledgeObject && operation === MeritOperationEnum.DECREMENT) {
        pledgeObject.meritCount -= 1;
      } else {
        return res.status(404).json({
          message: 'No associated pledge found with ID in request body',
        });
      }

      // bye bye pledge
      if (pledgeObject.meritCount <= 0) {
        await Brother.deleteOne({ _id: pledgeID });
      } else {
        pledgeObject.save();
      }
    }

    const meritObject = await Merit.findById(meritObjectID);
    if (!meritObject) {
      return res.status(404).json({
        message: 'No associated merit object found with ID in request body',
      });
    }
    meritObject.isDispatched = true;
    meritObject.save();
  }
);

module.exports = meritController;
