import { Router } from 'express';
import FacilityService from '@services/facility.service';

const FacilityRouter = Router();
const Facility = new FacilityService();

// Expose request handlers to the service
FacilityRouter.use((req, res, next) => {
	Facility.Request = req;
	Facility.Response = res;

	next();
});

FacilityRouter.put(
	'/:id/cover',
	Facility.AuthenticateUser,
	Facility.UploadFile('facilities/:id/cover'),
	Facility.UpdateCover
);

FacilityRouter.put(
	'/:id/logo',
	Facility.AuthenticateUser,
	Facility.UploadFile('facilities/:id/logo'),
	Facility.UpdateLogo
);

export default FacilityRouter;
