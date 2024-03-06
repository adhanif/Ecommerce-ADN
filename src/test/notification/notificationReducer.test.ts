import { InitialNotificationState } from '../../misc/types';
import notificationReducer, {
  setNotification,
} from '../../redux/slices/notificationSlice';
import { createNewStore } from '../../redux/store';

let store = createNewStore();

const initialNotificationState: InitialNotificationState = {
  open: false,
  message: '',
  severity: 'success',
};

beforeEach(() => {
  store = createNewStore();
});

describe('notification reducer', () => {
  // test0: initial state
  test('should return the initial state', () => {
    const state = notificationReducer(initialNotificationState, { type: '' });
    expect(state).toEqual(initialNotificationState);
  });

  // notification dispatched
  test('should set the notification state when dispatched', () => {
    const newNotification = {
      open: true,
      message: 'New notification message',
      severity: 'error',
    };

    const action = setNotification(newNotification);
    const state = notificationReducer(initialNotificationState, action);
    expect(state).toEqual(newNotification);
  });

  // test2: notification not dispatched
  test('should not modify the state if no notification is dispatched', () => {
    const action = { type: 'OTHER_ACTION' };
    const state = notificationReducer(initialNotificationState, action);
    expect(state).toEqual(initialNotificationState);
  });
});
