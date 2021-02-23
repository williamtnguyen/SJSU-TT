const express = require('express');
const meritController = express.Router();
const passport = require('passport');

const Merit = require('./merit');
const Brother = require('../brothers/brother');
const validateMeritRequestInput = require('../util/form-validation/merit-request');
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
        const reducedMerit = {
          // eslint-disable-next-line no-underscore-dangle
          key: merit._id,
          pledgeName: merit.pledgeName,
          pledgeID: merit.pledgeID,
          issuerName: merit.issuerName,
          operation: merit.operation,
          description: merit.description,
          isDispatched: merit.isDispatched,
          isApproved: merit.isApproved,
        };
        if (merit.isDispatched) {
          response.dispatched.push(reducedMerit);
        } else {
          response.pending.push(reducedMerit);
        }
      });
      res.status(200).json(response);
    });
  }
);

/**
 * GET Endpoint (all merit requests submitted by user in JWT)
 * @route GET api/merits/requests/me
 * @desc retrieve all merit requests by user in JWT
 */
meritController.get(
  '/requests/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    Merit.find({}, (error, meritRequests) => {
      if (error) {
        console.log(error);
        return res
          .status(404)
          .json({ message: `No merit payloads found: ${error}` });
      }
      const reducedRequests = meritRequests.map((request) => ({
        // eslint-disable-next-line no-underscore-dangle
        key: request._id,
        pledgeName: request.pledgeName,
        operation: request.operation,
        description: request.description,
        status: !request.isDispatched
          ? 'PENDING'
          : request.isApproved
          ? 'APPROVED'
          : 'DISAPPROVED',
      }));
      return res.status(200).json(reducedRequests);
    });
  }
);

/**
 * POST Endpoint (submit merit request from active)
 * @route POST api/merits
 * @desc add a pending merit request
 */
meritController.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Form input validation
    const { errors, isValid } = validateMeritRequestInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      pledgeName,
      issuerName,
      pledgeID,
      issuerID,
      operation,
      description,
    } = req.body;

    const newMerit = new Merit({
      pledgeName,
      issuerName,
      pledgeID,
      issuerID,
      operation,
      description,
    });
    newMerit
      .save()
      .then((storedMerit) => res.status(200).json({ storedMerit }))
      .catch((error) => {
        throw new Error(`Error: ${error}`);
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
    const { pledgeID, operation } = meritPayload;
    // eslint-disable-next-line no-underscore-dangle
    const meritObjectID = meritPayload.key;

    // If pledge parent sees that merit request by active is legit, increment/decrement merit count from pledge
    if (isMeritApproved) {
      const pledgeObject = await Brother.findById(pledgeID);

      if (pledgeObject && operation === MeritOperationEnum.MERIT) {
        pledgeObject.meritCount += 1;
      } else if (pledgeObject && operation === MeritOperationEnum.DEMERIT) {
        pledgeObject.meritCount -= 1;
      } else {
        return res.status(404).json({
          message: 'No associated pledge found with ID in request body',
        });
      }

      // // bye bye pledge
      // if (pledgeObject.meritCount <= 0) {
      //   await Brother.deleteOne({ _id: pledgeID });
      // } else {
      //   pledgeObject.save();
      // }
      pledgeObject.save();
    }

    const meritObject = await Merit.findById(meritObjectID);
    if (!meritObject) {
      return res.status(404).json({
        message: 'No associated merit object found with ID in request body',
      });
    }
    meritObject.isDispatched = true;
    meritObject.isApproved = isMeritApproved;
    meritObject.save();
    res.status(200).json(meritObject);
  }
);

/**
 * DELETE Endpoint (delete merit requests in 'dispatched' tab)
 * @route api/merits
 * @desc delete an already dispatched merit request
 */
meritController.delete(
  '/:meritRequestID',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Check if JWT sent in request is pledge parent or webmaster
    checkIfUserEndpointAccess(req, res, [
      PositionEnum.PLEDGE_PARENT,
      PositionEnum.WEBMASTER,
    ]);

    const { meritRequestID } = req.params;
    try {
      const deleteResult = await Merit.deleteOne({ _id: meritRequestID });
      res.status(200).json(deleteResult);
    } catch (error) {
      return res
        .status(404)
        .json({ message: 'Merit Request with this ID does not exist' });
    }
  }
);

module.exports = meritController;
