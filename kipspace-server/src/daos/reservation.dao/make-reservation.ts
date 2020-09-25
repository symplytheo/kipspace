import { UploadApiResponse, v2 as Cloudinary } from 'cloudinary';
import { BAD_REQUEST } from 'http-status-codes';
import Barcode from 'bwip-js';
/* @ts-ignore */
import streamifier from 'streamifier';

import Reservation from '@models/Reservation.model';
import { GetOneFacility } from '@daos/facility.dao';
import { Exception } from '@shared/functions';
import { APP_NAME } from '@shared/constants';

export const MakeReservation = async (
	userId: string,
	facilityId: string,
	seats: number,
	date_reserved: any,
	time_reserved: string
) => {
	try {
		const facility = await GetOneFacility(facilityId);

		if (seats > facility.available_seats)
			throw new Exception(BAD_REQUEST, 'Facility capacity exceeded.');

		const currentStatus = {
			status: 'PENDING',
		};

		const code = `KS-${Date.now()}`;

		// generate barcode here
		const GenerateBarcode = async () =>
			new Promise<Buffer>((resolve, reject) => {
				Barcode.toBuffer(
					{
						bcid: 'qrcode',
						text: code,
						scaleX: 10,
						scaleY: 10,
					},
					(err, buffer) => {
						if (err) reject(err);

						resolve(buffer);
					}
				);
			});

		const buffer = await GenerateBarcode();
		const { url } = await (async () =>
			new Promise<UploadApiResponse>((resolve, reject) => {
				const stream = Cloudinary.uploader.upload_stream(
					{
						folder: `${APP_NAME}/barcodes`,
						// public_id: `reservations/${code}`,
					},
					async (streamError, result) => {
						if (streamError) reject(streamError);

						resolve(result);
					}
				);

				streamifier.createReadStream(buffer).pipe(stream);
			}))();

		const reservation = new Reservation({
			user: userId,
			facility: facilityId,
			barcode_url: url,
			code,
			seats,
			date_reserved,
			time_reserved,
		});

		await reservation.save();

		await reservation.updateOne({
			$addToSet: { statuses: currentStatus },
		});

		await facility.updateOne({
			available_seats: facility.available_seats - seats,
		});

		return reservation;
	} catch (error) {
		return Promise.reject(error);
	}
};
