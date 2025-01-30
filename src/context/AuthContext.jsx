import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, realtimeDb } from '../config/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // First check SuperAdmin
          const superAdminRef = ref(realtimeDb, `Admins/SuperAdmin/${firebaseUser.uid}`);
          const superAdminSnapshot = await get(superAdminRef);

          if (superAdminSnapshot.exists()) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: 'commissioner',
              ...superAdminSnapshot.val()
            });
          } else {
            // Check Department Admins
            const deptAdminRef = ref(realtimeDb, `Admins/DepartmentAdmin/${firebaseUser.uid}`);
            const deptAdminSnapshot = await get(deptAdminRef);

            if (deptAdminSnapshot.exists()) {
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                role: 'deptAdmin',
                ...deptAdminSnapshot.val()
              });
            } else {
              // No valid role found
              await signOut(auth);
              setUser(null);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check SuperAdmin
      const superAdminRef = ref(realtimeDb, `Admins/SuperAdmin/${userCredential.user.uid}`);
      const superAdminSnapshot = await get(superAdminRef);

      if (superAdminSnapshot.exists()) {
        return 'commissioner';
      }

      // Check Department Admin
      const deptAdminRef = ref(realtimeDb, `Admins/DepartmentAdmin/${userCredential.user.uid}`);
      const deptAdminSnapshot = await get(deptAdminRef);

      if (deptAdminSnapshot.exists()) {
        return 'deptAdmin';
      }

      // No valid role found
      await signOut(auth);
      throw new Error('User not authorized');
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
