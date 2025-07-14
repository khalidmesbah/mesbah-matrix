'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';
import type { MatrixType } from '@/stores/the-matrix';
import type { ActionResponseT } from '@/types/globals';

const initialMatrix: MatrixType = {
  tasks: {
    'task-1': {
      id: 'task-1',
      text: 'Prepare presentation for Monday meeting',
      done: true,
    },
    'task-2': {
      id: 'task-2',
      text: 'Schedule dentist appointment',
      done: false,
    },
    'task-3': { id: 'task-3', text: 'Complete project report', done: false },
    'task-4': {
      id: 'task-4',
      text: 'Send follow-up emails to clients',
      done: true,
    },
    'task-5': {
      id: 'task-5',
      text: 'Plan team-building activity',
      done: false,
    },
    'task-6': {
      id: 'task-6',
      text: 'Book flight for business trip',
      done: false,
    },
    'task-7': {
      id: 'task-7',
      text: 'Update software on office computers',
      done: true,
    },
    'task-8': { id: 'task-8', text: 'Organize files on computer', done: false },
    'task-9': { id: 'task-9', text: 'Research market trends', done: false },
    'task-10': {
      id: 'task-10',
      text: 'Prepare monthly budget report',
      done: false,
    },
    'task-11': {
      id: 'task-11',
      text: 'Conduct performance reviews',
      done: true,
    },
    'task-12': {
      id: 'task-12',
      text: 'Attend online training session',
      done: false,
    },
    'task-13': {
      id: 'task-13',
      text: 'Delegate social media management to intern',
      done: true,
    },
    'task-14': {
      id: 'task-14',
      text: 'Assign routine maintenance tasks to maintenance team',
      done: true,
    },
    'task-15': {
      id: 'task-15',
      text: 'Cancel subscription to unused software',
      done: false,
    },
    'task-16': {
      id: 'task-16',
      text: 'Delete old marketing materials',
      done: true,
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'do',
      taskIds: ['task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'schedule',
      taskIds: [
        'task-1',
        'task-2',
        'task-5',
        'task-6',
        'task-7',
        'task-8',
        'task-9',
        'task-10',
        'task-11',
        'task-12',
      ],
    },
    'column-3': {
      id: 'column-3',
      title: 'delegate',
      taskIds: ['task-13', 'task-14'],
    },
    'column-4': {
      id: 'column-4',
      title: 'delete',
      taskIds: ['task-15', 'task-16'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

const _getMatrix = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (user) {
      const res = await getDoc(doc(db, 'users', user.id, 'data', 'the-matrix'));
      const newMatrix = res.data() as MatrixType;
      return newMatrix;
    } else {
      return initialMatrix;
    }
  } catch (error) {
    console.error(error);
    return initialMatrix;
  }
};

const _setMatrix = async (newMatrix: MatrixType): Promise<ActionResponseT> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw "there's no user";

    await setDoc(doc(db, 'users', user.id, 'data', 'the-matrix'), newMatrix);

    return {
      success: true,
      message: 'the matrix has been added successfully',
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: error as string };
  }
};

export { _getMatrix, _setMatrix };
