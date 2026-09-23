const roll = require("../models/rollModel");
const appRoutes = require("../models/appRouteModel");
const appRouteRoll = require("../models/appRouteRollModel");
const {DEFAULT_APP_ROUTES, DEFAULT_ROLES, DEFAULT_ROLL_APP_ROUTES} = require("../config/conectionDB");

const createRoll = async () => {
    try {
        for (const rollData of DEFAULT_ROLES) {
            await roll.create(rollData);
        }
    } catch (error) {
        throw error;
    }
};
const createAppRoutes = async () => {
    try {
        for (const appRouteData of DEFAULT_APP_ROUTES) {
            await appRoutes.create(appRouteData);
        }
    } catch (error) {
        throw error;
    }
};
const createAppRouteRoll = async () => {
    try {
        for (const appRouteRollData of DEFAULT_ROLL_APP_ROUTES) {
            await appRouteRoll.create(appRouteRollData);
        }
    } catch (error) {
        throw error;
    }
};
module.exports = {
    createRoll,
    createAppRoutes,
    createAppRouteRoll
};