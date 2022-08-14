import Contacts from '../services/contacts';
import { AccountContacts, KairosConfigOptions } from './mocks/mocks';
import { lastValueFrom, of } from 'rxjs';
import {
  AccountContactDetailsStub,
  AccountContactsStub,
  CreateAccountContactResponseStub,
  CreateAccountContactStub,
} from './stubs/contacts.stub';
import { HttpStatusCode } from '../constants/http-status-code.constants';

jest.mock('../services/contacts');

describe('Contacts List', function () {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  describe('Constructor Test', function () {
    it('should an instance of Contacts', function () {
      const contactInstance = new Contacts(KairosConfigOptions, { paginate: { page: 1, size: 10 } });
      expect(contactInstance).toBeInstanceOf(Contacts);
    });
  });

  describe('Get All Contacts', function () {
    let contactInstance: Contacts;
    beforeAll(() => {
      contactInstance = new Contacts(KairosConfigOptions);
    });

    describe('Builder Function', function () {
      it('should return an instance of Contacts on setSize()', function () {
        jest.spyOn(contactInstance, 'setSize').mockReturnThis();
        const response = contactInstance.setSize(10);
        expect(response).toBeInstanceOf(Contacts);
        expect(response.setSize).toBeCalledWith(10);
        expect(response.setSize).toBeCalledTimes(1);
      });

      it('should return an instance of Contacts on setPage()', function () {
        jest.spyOn(contactInstance, 'setPage').mockReturnThis();
        const response = contactInstance.setPage(1);
        expect(response).toBeInstanceOf(Contacts);
        expect(response.setPage).toBeCalledTimes(1);
        expect(response.setPage).toBeCalledWith(1);
      });

      it('should return an instance of Contacts on setSort()', function () {
        jest.spyOn(contactInstance, 'setSort').mockReturnThis();
        const response = contactInstance.setSort('DESC');
        expect(response).toBeInstanceOf(Contacts);
        expect(response.setSort).toBeCalledTimes(1);
        expect(response.setSort).toBeCalledWith('DESC');
      });
    });

    describe('All contact builder to be available on instance', function () {
      beforeEach(() => {
        jest.spyOn(contactInstance, 'setPage').mockReturnThis();
        jest.spyOn(contactInstance, 'setSize').mockReturnThis();
        jest.spyOn(contactInstance, 'setSort').mockReturnThis();
      });

      it('should return a defined builder functions', function () {
        expect(contactInstance).toBeDefined();
        expect(contactInstance.setPage).toBeDefined();
        expect(contactInstance.setSize).toBeDefined();
        expect(contactInstance.setSort).toBeDefined();
        expect(contactInstance.asList).toBeDefined();
      });

      it('should return a paginated list with page of 1 and size of 12', async () => {
        jest.spyOn(contactInstance, 'asList').mockImplementation(() => {
          return of(AccountContactsStub(HttpStatusCode.OK, 'Paginated list of contacts', true, undefined, 1, 12));
        });
        const response = await lastValueFrom(contactInstance.setPage(1).setSize(15).asList());
        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.success).toBeTruthy();
        expect(response.data.paginateObj.page).toBe(1);
        expect(response.data.paginateObj.docs).toHaveLength(1);
        expect(response.data.paginateObj.limit).toBe(12);
      });

      it('should failed with a status code of 500 and success of false', async () => {
        jest.spyOn(contactInstance, 'asList').mockImplementation(() => {
          return of(AccountContactsStub(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Paginated list of contacts', false));
        });
        const response = await lastValueFrom(contactInstance.setPage(1).setSize(15).asList());
        expect(response.statusCode).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
        expect(response.success).toBeFalsy();
      });
    });
  });

  describe('Create A New Contact', function () {
    describe('Success Contact Creation', function () {
      let contactInstance: Contacts;
      beforeAll(() => {
        contactInstance = new Contacts(KairosConfigOptions, { body: CreateAccountContactStub() });
      });
      it('should create a new contact successfully', async () => {
        jest.spyOn(contactInstance, 'create').mockImplementation(() => {
          return of(CreateAccountContactResponseStub(200, true)) as any;
        });
        const response = await lastValueFrom(contactInstance.create());
        expect(response.statusCode).toBe(200);
        expect(response.data).toStrictEqual(AccountContacts);
        expect(response.success).toBeTruthy();
        expect(response.statusMessage).toBe('Contact created successfully');
      });
    });

    describe('Failed Contact Creation', function () {
      let contactInstance: Contacts;
      beforeEach(() => {
        contactInstance = new Contacts(KairosConfigOptions);
      });
      it('should return bad request for not passing a valid payload', async () => {
        jest.spyOn(contactInstance, 'create').mockImplementation(() => {
          return of(CreateAccountContactResponseStub(400, false, { message: 'Invalid request body passed' }));
        });
        const response = await lastValueFrom(contactInstance.create());
        expect(contactInstance).toBeInstanceOf(Contacts);
        expect(response.success).toBeFalsy();
        expect(response.data).toHaveProperty(['message']);
        expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
      });
    });
  });

  describe('Get A Contact Details', function () {
    let contactInstance: Contacts;
    beforeEach(() => {
      contactInstance = new Contacts(KairosConfigOptions);
    });
    it('should return the details of the contact successfully', async () => {
      jest.spyOn(contactInstance, 'details').mockImplementation((contactId: number) => {
        return of(
          CreateAccountContactResponseStub(
            200,
            true,
            AccountContactDetailsStub().find((contact) => contact.id === contactId),
          ),
        );
      });
      const response = await lastValueFrom(contactInstance.details(2506));
      expect(response.statusCode).toBe(200);
      expect(response.data.id).toEqual(2506);
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
