const {createRoll, createAppRouteRoll, createAppRoutes} = require("../services/setupAppServices")

async function setup(params) {
    try{
        await createRoll();
        await createAppRoutes();
        await createAppRouteRoll();
        console.log("Database setup completed successfully,");
    
    } catch (error){
        console.error("Error setting up the database:", error);
    }    
}