/**
 * @fileOverview All actions which relies on a 'circuit' role
 * @namespace microservice
 * @module micro/circuit/handlers/circuit
 */

const boom = require('boom');

/**
 * @constant circuit
 * @desc In-memory circuit storage
 * @private
 */
const circuit = [
    {
        EVCType: 'EVP',
        CustomerName: 'CHARTER_MDSO_DRT',
        CircuitID: '51.L1XX.009158..TWCC',
        Bandwidth: 100,
        ServiceLevel: 'Silver',
        UnitType: 'Customer',
        ServiceVLANID: 1201,
        CustomerVLANID: [
            '100-110',
        ],
        VCID: 429369,
        EtherType: 8100,
        ZSide: {
            CustomerAddr: 'SITE-4',
            PE: {
                Vendor: 'JUNIPER',
                Model: 'MX480',
                Hostname: 'AUSDTXIR5CW',
                Interface: 'ge-2/1/0',
                Description: 'CUST:ELINE:CHARTER_MDSO_DRT@SITE-4:51.L1XX.009158..TWCC:SITE-1',
                PortType: 'CPE-Connected',
                VLANOperation: 'Match on VLAN ID',
                VLAN: 1201,
            },
            CPE: {
                Vendor: 'RAD',
                Model: 'ETX-203AX',
                Hostname: 'CNI5TXR36ZW',
                Interface: 'ethernet 3',
                Description: 'UNI:ELINE:CHARTER_MDSO_DRT@SITE-4:51.L1XX.009158..TWCC:SITE-1',
                PortType: 'Customer Handoff (UNI)',
                VLANOperation: 'Push S-VLAN tag on input',
                VLAN: 1201,
                Type: 'Undeployed',
                CFMType: 'Probe',
                CFMScope: 'Regional',
                CFMRemoteReflector: 'Near End Site',
            },
        },
        ASide: {
            CustomerAddr: 'SITE-1',
            PE: {
                Vendor: 'JUNIPER',
                Model: 'MX480',
                Hostname: 'AUSDTXIR2CW',
                Interface: 'ge-1/1/8',
                PortType: 'CPE-Connected',
                Description: 'CUST:ELINE:CHARTER_MDSO_DRT@SITE-1:51.L1XX.009158..TWCC:SITE-4',
                VLANOperation: 'Match on VLAN ID',
                VLAN: 1201,
            },
            CPE: {
                Vendor: 'RAD',
                Model: 'ETX-203AX',
                Hostname: 'CNI2TXR39ZW',
                Interface: 'ethernet 4',
                Description: 'UNI:ELINE:CHARTER_MDSO_DRT@SITE-1:51.L1XX.009158..TWCC:SITE-4',
                PortType: 'Customer Handoff (UNI)',
                VLANOperation: 'Match on VLAN ID',
                VLAN: 1201,
                Type: 'Existing',
                CFMType: 'Reflector',
                CFMMDLevel: 3,
                CFMMAID: 1,
            },
        },
    },
];

module.exports = class Circuit {
    /**
     * @desc Get circuit info by circuitId
     * @param {RequestObject} data - Contain all data from request
     * @param {HandleResponse} [h] - optional parameter for adding some additional info
     * @return {Object} - response
     * @throws {Error|Boom}
     */
    getById(data) {
        const { params: { circuitId: _circuitId } } = data;
        const circuitId = Number.parseInt(_circuitId, 10);
        if (!circuitId || isNaN(circuitId)) {
            throw boom.badRequest('CircuitId is invalid');
        }

        if (!circuit) {
            throw boom.badRequest('Circuit with circuitId was not found');
        }

        return {
            circuit,
            success: true,
        };
    }
};
