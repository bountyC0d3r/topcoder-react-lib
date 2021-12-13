/**
 * @module tc
 * @desc Collection of small Topcoder-related functions.
 * @todo More TC-related utils should be moved here from Community-app.
 */

/**
 * Codes of the Topcoder communities.
 */
/* TODO: These are originally motivated by Topcoder API v2. Topcoder API v3
 * uses upper-case literals to encode the tracks. At some point, we should
 * update it in this code as well! */
export const COMPETITION_TRACKS = {
  DS: 'Data Science',
  DES: 'Design',
  DEV: 'Development',
  QA: 'Quality Assurance',
};

export const OLD_COMPETITION_TRACKS = {
  DATA_SCIENCE: 'DATA_SCIENCE',
  DESIGN: 'DESIGN',
  DEVELOP: 'DEVELOP',
  QA: 'QA',
};

export const OLD_SUBTRACKS = {
  TEST_SUITES: 'TEST_SUITES',
  BUG_HUNT: 'BUG_HUNT',
  TEST_SCENARIOS: 'TEST_SCENARIOS',
  TESTING_COMPETITION: 'TESTING_COMPETITION',
};

/*
 * Challenge Status
 */
export const CHALLENGE_STATUS = {
  ACTIVE: 'Active',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  DRAFT: 'Draft',
};

/**
 * Review Opportunity types
 */
export const REVIEW_OPPORTUNITY_TYPES = {
  'Contest Review': 'Review',
  'Spec Review': 'Specification Review',
  'Iterative Review': 'Iterative Review',
};

/**
 * Gets payload from a standard success response from TC API; or throws
 * an error in case of a failure response.
 * @param {Object} res
 * @param {Boolean} shouldThrowError should throw error if request fail
 * @return {Promise} Resolves to the payload.
 */
export async function getApiResponsePayload(res, shouldThrowError = true) {
  if (!res.ok) {
    if (shouldThrowError) {
      throw new Error(res.statusText);
    } else {
      return null;
    }
  }
  const x = (await res.json()).result;
  if (!x) {
    return null;
  }
  if ((!x.success)) {
    if (shouldThrowError) {
      throw new Error(x.content);
    } else {
      return null;
    }
  }
  return x.content;
}

/**
 * Gets payload from a stand success response from TC V5 API or
 * thorw errors in case of a failure responose
 * @param {Object} response
 * @returns V5 API response
 */
export function handleApiResponse(response) {
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

/**
 * Gets payload from a standard success response from TC LOOKER API; or throws
 * an error in case of a failure response.
 * @param {Object} res
 * @return {Promise} Resolves to the payload.
 */
export async function getLookerApiResponsePayload(res) {
  const resJson = await res.json();
  if (Array.isArray(resJson)) {
    return {
      res: resJson,
      error: false,
    };
  }

  const x = resJson.result;
  return {
    res: x.content,
    error: !x.success,
    status: x.status,
  };
}
