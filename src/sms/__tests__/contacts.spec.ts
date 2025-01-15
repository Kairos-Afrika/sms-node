import { Contacts } from '../services/contacts';
import { KairosConfigOptions } from './mocks/mocks';
import { lastValueFrom, of } from 'rxjs';
import { HttpStatusCode } from '../constants/http-status-code.constants';
import { buildSMSResponse } from '../utils/helpers';
import { Contact, ContactsListResponse } from '../types/contacts.types';

describe('Contacts', function () {
  let contactInstance: Contacts;
  const mockContact: Contact = {
    id: 2506,
    name: 'Test Contact',
    phone: '+1234567890',
    dateOfBirth: '1990-01-01',
    slug: 'test-contact',
    uuid: 'test-uuid',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    allowBirthdayNotifications: true,
  };

  beforeEach(() => {
    contactInstance = new Contacts(KairosConfigOptions, { paginate: { page: 1, size: 12 } });
  });

  it('should create an instance of contacts', function () {
    expect(contactInstance).toBeDefined();
  });

  describe('Get Contacts', () => {
    it('should return a list of contacts', async () => {
      jest.spyOn(contactInstance, 'getContacts').mockImplementation(() => {
        return of({
          statusCode: HttpStatusCode.OK,
          statusMessage: 'Contacts retrieved successfully',
          timestamp: new Date().toISOString(),
          success: true,
          data: {
            paginateObj: {
              docs: [mockContact],
              limit: 12,
              total: 1,
              page: 1,
              pages: 1,
            },
            meta: {
              itemCount: 1,
              limit: 12,
            },
          },
        });
      });

      const response = await lastValueFrom(contactInstance.getContacts());
      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.success).toBeTruthy();
      expect(response.data.paginateObj.page).toBe(1);
      expect(response.data.paginateObj.docs).toHaveLength(1);
      expect(response.data.paginateObj.limit).toBe(12);
    });

    it('should handle error when getting contacts', async () => {
      jest.spyOn(contactInstance, 'getContacts').mockImplementation(() => {
        return of({
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
          statusMessage: 'Failed to retrieve contacts',
          timestamp: new Date().toISOString(),
          success: false,
          data: {
            paginateObj: {
              docs: [],
              limit: 12,
              total: 0,
              page: 1,
              pages: 0,
            },
            meta: {
              itemCount: 0,
              limit: 12,
            },
          },
        });
      });

      const response = await lastValueFrom(contactInstance.getContacts());
      expect(response.statusCode).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
      expect(response.success).toBeFalsy();
    });
  });

  describe('Create Contact', () => {
    it('should create a new contact', async () => {
      jest.spyOn(contactInstance, 'createContact').mockImplementation(() => {
        return of(buildSMSResponse<Contact>(HttpStatusCode.OK, 'Contact created successfully', mockContact, true));
      });

      const response = await lastValueFrom(contactInstance.createContact());
      expect(response.statusCode).toBe(200);
      expect(response.data).toStrictEqual(mockContact);
      expect(response.success).toBeTruthy();
      expect(response.statusMessage).toBe('Contact created successfully');
    });

    it('should handle error when creating contact', async () => {
      jest.spyOn(contactInstance, 'createContact').mockImplementation(() => {
        return of(
          buildSMSResponse<Contact>(HttpStatusCode.BAD_REQUEST, 'Failed to create contact', mockContact, false),
        );
      });

      const response = await lastValueFrom(contactInstance.createContact());
      expect(response.success).toBeFalsy();
      expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    });
  });

  describe('Update Contact', () => {
    it('should update an existing contact', async () => {
      jest.spyOn(contactInstance, 'updateContact').mockImplementation((contactId: string) => {
        return of(
          buildSMSResponse<Contact>(
            HttpStatusCode.OK,
            'Contact details updated successfully',
            { ...mockContact, id: parseInt(contactId, 10) },
            true,
          ),
        );
      });

      const response = await lastValueFrom(contactInstance.updateContact('2506'));
      expect(response.statusCode).toBe(200);
      expect(response.data.id).toEqual(2506);
      expect(response.statusMessage).toBe('Contact details updated successfully');
    });
  });

  describe('Delete Contact', () => {
    it('should delete an existing contact', async () => {
      jest.spyOn(contactInstance, 'deleteContact').mockImplementation((contactId: string) => {
        return of(
          buildSMSResponse<Contact>(
            HttpStatusCode.OK,
            'Contact deleted successfully',
            { ...mockContact, id: parseInt(contactId, 10) },
            true,
          ),
        );
      });

      const response = await lastValueFrom(contactInstance.deleteContact('2506'));
      expect(response.statusCode).toBe(200);
      expect(response.data.id).toEqual(2506);
      expect(response.statusMessage).toBe('Contact deleted successfully');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
