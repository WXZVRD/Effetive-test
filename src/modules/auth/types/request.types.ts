import {JwtPayload} from "../utils";

export interface AuthenticatedRequest {
    user?: JwtPayload;
}