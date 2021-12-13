/**
 * @module "services.userTraits"
 * @desc  This module provides a service for user traits crud
 * via API V3.
 */
import toCapitalCase from 'to-capital-case';
import { getApiResponsePayload } from '../utils/tc';
import { getApi } from './api';

/**
 * Service class.
 */
class UserTraitsService {
  /**
   * @param {String} tokenV3 Optional. Auth token for Topcoder API v3.
   */
  constructor(tokenV3) {
    this.private = {
      api: getApi('V3', tokenV3),
      tokenV3,
    };
  }

  /**
   * Get member's all traits.
   * @param {String} handle User handle.
   * @return {Promise} Resolves to the member traits.
   */
  async getAllUserTraits(handle) {
    // FIXME: Remove the .toLowerCase() when the API is fixed to ignore the case in the route params
    const res = await this.private.api.get(`/members/${handle.toLowerCase()}/traits`);
    return getApiResponsePayload(res);
  }

  /**
   * Add member's trait.
   * @param {String} handle User handle.
   * @param {String} traitId Trait Id.
   * @param {Array} data Trait data.
   * @return {Promise} Resolves to the member traits.
   */
  async addUserTrait(handle, traitId, data) {
    const body = {
      param: [{
        traitId,
        categoryName: toCapitalCase(traitId),
        traits: {
          data,
        },
      }],
    };

    const res = await this.private.api.postJson(`/members/${handle}/traits`, body);
    return getApiResponsePayload(res);
  }

  /**
   * Update member's trait.
   * @param {String} handle User handle.
   * @param {String} traitId Trait Id.
   * @param {Array} data Trait data.
   * @return {Promise} Resolves to the member traits.
   */
  async updateUserTrait(handle, traitId, data) {
    const body = {
      param: [{
        traitId,
        categoryName: toCapitalCase(traitId),
        traits: {
          data,
        },
      }],
    };

    const res = await this.private.api.putJson(`/members/${handle}/traits`, body);
    return getApiResponsePayload(res);
  }

  /**
   * Delete member's trait.
   * @param {String} handle User handle.
   * @param {String} traitId Trait Id.
   * @return {Promise} Resolves to the member traits.
   */
  async deleteUserTrait(handle, traitId) {
    const res = await this.private.api.delete(`/members/${handle}/traits?traitIds=${traitId}`);
    return getApiResponsePayload(res);
  }
}

let lastInstance = null;
/**
 * Returns a new or existing user trait service.
 * @param {String} tokenV3 Optional. Auth token for Topcoder API v3.
 * @return {UserTraitsService} userTraits service object
 */
export function getService(tokenV3) {
  if (!lastInstance || tokenV3 !== lastInstance.private.tokenV3) {
    lastInstance = new UserTraitsService(tokenV3);
  }
  return lastInstance;
}

/* Using default export would be confusing in this case. */
export default undefined;
