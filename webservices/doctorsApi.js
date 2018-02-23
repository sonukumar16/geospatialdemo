const Doctor = require('../models/doctor');


module.exports = {
    register_doctor: (req, res) => {
        Doctor.create(req.body, (err, success) => {
            if (err) {

                if (err.code == 11000) {
                    return res.json({
                        'response_code': 404,
                        'response_message': 'This email is already registered.'
                    });
                }
                return res.json({
                    'response_code': 500,
                    'response_message': 'Internal server error.'
                });
            } else {
                return res.json({
                    'response_code': 200,
                    'response_message': 'Successfully Registered.'
                });
            }
        });
    },
    fetch_doctors: (req, res) => {
        if (!req.body.lon_lat) {
            return res.json({
                'response_code': 204,
                'response_message': 'Please send  lat and log.'
            });
        }
        Doctor.find({
            location: {
                $geoWithin: {
                    $centerSphere: [req.body.lon_lat, 10 / 6378.1]
                }
            }
        }, (err, success) => {
            if (err) {
                return res.json({
                    'response_code': 500,
                    'response_message': 'Internal server error.'
                });
            } else if (!success.length) {
                return res.json({
                    'response_code': 404,
                    'response_message': 'No doctors available on these areas.'
                });
            } else {
                return res.json({
                    'response_code': 200,
                    'response_message': 'Successfully get doctors.',
                    result: success
                });
            }
        });
    }
};