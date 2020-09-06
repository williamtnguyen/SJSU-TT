import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Sample = (props) => {
  const [person, setPerson] = useState();
  const { resultsAmount } = props;

  useEffect(() => {
    fetch(`https://randomuser.me/api?results=${resultsAmount}`)
      .then((result) => result.json())
      .then((randomPerson) => setPerson(randomPerson));
  }, [resultsAmount]);

  return (
    <div>
      <h1 className="text-center">
        this a sample dynamic page rendered on the client side
      </h1>
      {resultsAmount && (
        <h2 className="text-center">
          the variable passed is:
          {resultsAmount}
        </h2>
      )}
      <h3 className="text-center">API call results:</h3>
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </div>
  );
};

Sample.propTypes = {
  resultsAmount: PropTypes.number,
};

Sample.defaultProps = {
  resultsAmount: 1,
};

export default Sample;
