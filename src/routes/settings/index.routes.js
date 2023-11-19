import Agency from "./Agency.routes.js";
import AgencyDivision from "./AgencyDivision.routes.js";
import Answer from "./Answer.routes.js";
import Area from "./Area.routes.js";
import Division from "./Division.routes.js";
import Permission from "./Permission.routes.js";
import PermissionRole from "./PermissionRole.routes.js";
import Role from "./Role.routes.js";
import User from "./User.routes.js";

const settings = [
    Agency,
    AgencyDivision,
    Answer,
    Area,
    Division,
    Permission,
    PermissionRole,
    Role,
    User
]

export { settings };