import { Router } from 'express';
import FacilityService from '@services/facility.service';
// router.put('/update/:id/gallery', UserAuth, ImageUploader('facility/:id/gallery'), UploadFacilityGallery);

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
	Facility.UploadFile('facility/:id/cover'),
	Facility.UpdateCover
);

FacilityRouter.put(
	'/:id/logo',
	Facility.AuthenticateUser,
	Facility.UploadFile('facility/:id/logo'),
	Facility.UpdateLogo
);

export default FacilityRouter;
