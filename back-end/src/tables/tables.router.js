/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

 const router = require("express").Router();
 const controller = require("./tables.controller");
 const methodNotAllowed = require("../errors/methodNotAllowed");

/*     
 root "/" === "/tables"   
    ** Check app.js line 19
*/

 router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
 router.route("/:table_id/seat").delete(controller.delete).put(controller.update).all(methodNotAllowed);
 
 module.exports = router;