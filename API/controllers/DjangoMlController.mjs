import axios from 'axios';
import { checkSchema, validationResult } from 'express-validator';

// Define a validation schema
const paramSchema = {
    FGM: { in: ['body'], isNumeric: true, optional: { options: { nullable: true } } },
    FGpercent: { in: ['body'], isFloat: true, optional: { options: { nullable: true } } },
    threeMade: { in: ['body'], isNumeric: true, optional: { options: { nullable: true } } },
    FTM: { in: ['body'], isNumeric: true, optional: { options: { nullable: true } } },
    ftpercent: { in: ['body'], isFloat: true, optional: { options: { nullable: true } } },
    DREB: { in: ['body'], isNumeric: true, optional: { options: { nullable: true } } },
    OREB: { in: ['body'], isNumeric: true, optional: { options: { nullable: true } } },
    AST: { in: ['body'], isNumeric: true, optional: { options: { nullable: true } } },
    STL: { in: ['body'], isNumeric: true, optional: { options: { nullable: true } } },
    BLK: { in: ['body'], isNumeric: true, optional: { options: { nullable: true } } },
    TOV: { in: ['body'], isNumeric: true, optional: { options: { nullable: true } } },
    PF: { in: ['body'], isNumeric: true, optional: { options: { nullable: true } } }
};

export const findLRPred = [
    checkSchema(paramSchema),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const params = req.body; // Parameters are now sent in the body

            try {
                const response = await axios.post('http://127.0.0.1:8000/LR_pred/', params);
                return res.status(200).json(response.data);
            } catch (error) {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                    console.error('Error headers:', error.response.headers);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
                if (error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
                    return res.status(503).json({ message: 'Service Unavailable. Please try again later.' });
                }
                return res.status(error.response ? error.response.status : 500).json({ message: error.message });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(400).json({ success: false, errors: "BAD DJANGO REQUEST FROM DJANGOMLCONTROLLER" });
        }
    }
];