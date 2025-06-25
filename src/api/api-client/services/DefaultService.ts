/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Add
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiStoresAdd(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Stores/Add',
        });
    }
    /**
     * GetAll
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiStoresGetAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Stores/GetAll',
        });
    }
    /**
     * GetById
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiStoresGetByIdA524129BFdde4B6984D0Ce4B0D885925(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Stores/GetById/a524129b-fdde-4b69-84d0-ce4b0d885925',
        });
    }
    /**
     * Update
     * @returns any Successful response
     * @throws ApiError
     */
    public static putApiStoresUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Stores/Update',
        });
    }
    /**
     * SearchByName
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiStoresSearchByName?searchText=hy(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Stores/SearchByName?searchText=hy',
        });
    }
    /**
     * Delete
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiStoresDelete(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Stores/Delete',
        });
    }
    /**
     * Login
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiUsersLogin(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Users/Login',
        });
    }
    /**
     * Register
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiUsersRegister(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Users/Register',
        });
    }
    /**
     * ConfirmPhoneOTP
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiUsersConfirmPhoneOtp(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Users/ConfirmPhoneOTP',
        });
    }
    /**
     * RequestPasswordReset
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiUsersRequestPasswordReset(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Users/RequestPasswordReset',
        });
    }
    /**
     * ConfirmPasswordReset
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiUsersConfirmPasswordReset(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Users/ConfirmPasswordReset',
        });
    }
    /**
     * Add
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiCustomersAdd(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Customers/Add',
        });
    }
    /**
     * GetAll
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCustomersGetAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Customers/GetAll',
        });
    }
    /**
     * GetById
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCustomersGetById6135778D33894C528DecD0F45797B9A5(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Customers/GetById/6135778d-3389-4c52-8dec-d0f45797b9a5',
        });
    }
    /**
     * Update
     * @returns any Successful response
     * @throws ApiError
     */
    public static putApiCustomersUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Customers/Update',
        });
    }
    /**
     * SearchByName
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCustomersSearchByName?searchText=m(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Customers/SearchByName?searchText=m',
        });
    }
    /**
     * Delete
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiCustomersDelete(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Customers/Delete',
        });
    }
    /**
     * Add
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiProductsAdd(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Products/Add',
        });
    }
    /**
     * GetAll
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiProductsGetAll?storeId=f8Ba590E277B49Ba89EcA7D3F4B08601(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Products/GetAll?storeId=f8ba590e-277b-49ba-89ec-a7d3f4b08601',
        });
    }
    /**
     * GetById
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiProductsGetByIdAb56Bcfc292C443482731Debbea536F9(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Products/GetById/ab56bcfc-292c-4434-8273-1debbea536f9',
        });
    }
    /**
     * Update
     * @returns any Successful response
     * @throws ApiError
     */
    public static putApiProductsUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Products/Update',
        });
    }
    /**
     * SearchByName
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiProductsSearchByName(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Products/SearchByName',
        });
    }
    /**
     * Delete
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiProductsDelete(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Products/Delete',
        });
    }
    /**
     * Add
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiCitiesAdd(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Cities/Add',
        });
    }
    /**
     * GetAll
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCitiesGetAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Cities/GetAll',
        });
    }
    /**
     * GetById
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCitiesGetById06D5E25C3F4549D091E292541Bdbaa29(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Cities/GetById/06d5e25c-3f45-49d0-91e2-92541bdbaa29',
        });
    }
    /**
     * Update
     * @returns any Successful response
     * @throws ApiError
     */
    public static putApiCitiesUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Cities/Update',
        });
    }
    /**
     * SearchByName
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCitiesSearchByName?searchText=بر(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Cities/SearchByName?searchText=بر',
        });
    }
    /**
     * Delete
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiCitiesDelete(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Cities/Delete',
        });
    }
    /**
     * GetCitiesByCountryId
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCitiesGetAllByCountryId64707BecAe374A2CAf0A08Dd7C2Ae829(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Cities/GetAllByCountryId/64707bec-ae37-4a2c-af0a-08dd7c2ae829',
        });
    }
    /**
     * AddCitiesByCountryId
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiCitiesAddCitiesByCountryId?countryId=64707BecAe374A2CAf0A08Dd7C2Ae829(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Cities/AddCitiesByCountryId?CountryId=64707bec-ae37-4a2c-af0a-08dd7c2ae829',
        });
    }
    /**
     * CleareCitiesByCountryId
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiCitiesCleareCitiesByCountryId?countryId=fe73395575A14B3E821D653F7E938Be3(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Cities/CleareCitiesByCountryId?CountryId=fe733955-75a1-4b3e-821d-653f7e938be3',
        });
    }
    /**
     * Add
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiCountriesAdd(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Countries/Add',
        });
    }
    /**
     * GetAll
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCountriesGetAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Countries/GetAll',
        });
    }
    /**
     * GetById
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCountriesGetById28F252A745914Cc5B67D069E9C4C91D7(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Countries/GetById/28f252a7-4591-4cc5-b67d-069e9c4c91d7',
        });
    }
    /**
     * Update
     * @returns any Successful response
     * @throws ApiError
     */
    public static putApiCountriesUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Countries/Update',
        });
    }
    /**
     * SearchByName
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCountriesSearchByName?searchText=ا(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Countries/SearchByName?searchText=ا',
        });
    }
    /**
     * Delete
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiCountriesDelete(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Countries/Delete',
        });
    }
    /**
     * GetAll
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiUsersTypeGetAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/UsersType/GetAll',
        });
    }
    /**
     * GetById
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiUsersTypeGetById28F252A745914Cc5B67D069E9C4C91D7(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/UsersType/GetById/28f252a7-4591-4cc5-b67d-069e9c4c91d7',
        });
    }
    /**
     * Add
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiUsersTypeAdd(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/UsersType/Add',
        });
    }
    /**
     * Update
     * @returns any Successful response
     * @throws ApiError
     */
    public static putApiUsersTypeUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/UsersType/Update',
        });
    }
    /**
     * Delete
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiUsersTypeDelete(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/UsersType/Delete',
        });
    }
    /**
     * GetAll
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiStorePlatformsGetAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/StorePlatforms/GetAll',
        });
    }
    /**
     * GetById
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiStorePlatformsGetById81F7107EE80A49EbF45308Dd79F27916(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/StorePlatforms/GetById/81f7107e-e80a-49eb-f453-08dd79f27916',
        });
    }
    /**
     * Update
     * @returns any Successful response
     * @throws ApiError
     */
    public static putApiStorePlatformsUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/StorePlatforms/Update',
        });
    }
    /**
     * Add
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiStorePlatformsAdd(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/StorePlatforms/Add',
        });
    }
    /**
     * Delete
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiStorePlatformsDelete(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/StorePlatforms/Delete',
        });
    }
    /**
     * Add
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiInvoicesAdd(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Invoices/Add',
        });
    }
    /**
     * GetAll
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiInvoicesGetAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Invoices/GetAll',
        });
    }
    /**
     * GetById
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiInvoicesGetById28F252A745914Cc5B67D069E9C4C91D7(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Invoices/GetById/28f252a7-4591-4cc5-b67d-069e9c4c91d7',
        });
    }
    /**
     * GetByShipment
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiGetByShipment?shipmentId=3Fa85F6457174562B3Fc2C963F66Afa6(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/GetByShipment?shipmentId=3fa85f64-5717-4562-b3fc-2c963f66afa6',
        });
    }
    /**
     * Delete
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiInvoicesDelete28F252A745914Cc5B67D069E9C4C91D7(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Invoices/Delete/28f252a7-4591-4cc5-b67d-069e9c4c91d7',
        });
    }
    /**
     * Create
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiShipmentsCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Shipments/Create',
        });
    }
    /**
     * CreateMany
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiShipmentsCreateMany(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Shipments/CreateMany',
        });
    }
    /**
     * GetAll
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiShipmentsGetAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Shipments/GetAll',
        });
    }
    /**
     * GetById
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiShipmentsGetById3Fa85F6457174562B3Fc2C963F66Afa6(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Shipments/GetById/3fa85f64-5717-4562-b3fc-2c963f66afa6',
        });
    }
    /**
     * Update
     * @returns any Successful response
     * @throws ApiError
     */
    public static putApiShipmentsUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Shipments/Update',
        });
    }
    /**
     * Delete
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiShipmentsDelete3Fa85F6457174562B3Fc2C963F66Afa6(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Shipments/Delete/3fa85f64-5717-4562-b3fc-2c963f66afa6',
        });
    }
    /**
     * SendUpdate
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiShipmentsSendUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Shipments/SendUpdate',
        });
    }
    /**
     * GetAllByStoreId
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiShipmentsGetAll?storeId=f8Ba590E277B49Ba89EcA7D3F4B08601(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Shipments/GetAll?storeId=f8ba590e-277b-49ba-89ec-a7d3f4b08601',
        });
    }
    /**
     * GetAll
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCompaniesGetAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Companies/GetAll',
        });
    }
    /**
     * GetById
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiCompaniesGetById0196C6D2662349B88F7A4Df4B00864F7(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Companies/GetById/0196C6D2-6623-49B8-8F7A-4DF4B00864F7',
        });
    }
    /**
     * Add
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiCompaniesAdd(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Companies/Add',
        });
    }
    /**
     * Update
     * @returns any Successful response
     * @throws ApiError
     */
    public static putApiCompaniesUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Companies/Update',
        });
    }
    /**
     * Delete
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteApiCompaniesDelete61Dfd917Db2A418A8F99A5D416A9Fe61(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Companies/Delete/61dfd917-db2a-418a-8f99-a5d416a9fe61',
        });
    }
    /**
     * CalculateRate
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiShippingCalculateRate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Shipping/calculate-rate',
        });
    }
    /**
     * CreateShipments
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiShippingCreateShipment(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Shipping/create-shipment',
        });
    }
    /**
     * Initiate
     * @returns any Successful response
     * @throws ApiError
     */
    public static postApiPaymentsTopup(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Payments/topup',
        });
    }
    /**
     * Callback
     * @returns any Successful response
     * @throws ApiError
     */
    public static getApiPaymentsCallback?trandata=}(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Payments/callback?trandata={{trandata}}',
        });
    }
}
