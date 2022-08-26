import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import {
  getFirestore,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";

import Layout from "../components/Layout";
import "../styles/globals.css";
import "../firebase/firebase";
import ShowModal from "../components/ShowModal";
export const UserContext = createContext();

function MyApp({ Component, pageProps }) {
  const [userdata, setuserdata] = useState(null);
  const [shouldShowModal, setshouldShowModal] = useState(false);

  const router = useRouter();

  const checkUserProfile = async (useremail) => {
    try {
      const q = query(
        collection(getFirestore(), "users"),
        where("email", "==", useremail)
      );
      const docs = await getDocs(q);
      if (docs.docs.length > 0)
        setuserdata({ id: docs.docs.at(0).id, data: docs.docs.at(0).data() });
      else if (router.pathname != "/profile") {
        setshouldShowModal(true);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuserdata({ id: user.email, data: { name: "Anon" } });
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        checkUserProfile(user.email);
        // ...
      } else {
        setuserdata(null);
        router.replace("/login");
        // User is signed out
        // ...
      }
    });

    return unsubscribe;
  }, []);

  const modalAction = () => {
    router.push("/profile");
    setshouldShowModal(false);
  };
  return (
    <UserContext.Provider value={userdata}>
      {shouldShowModal && (
        <ShowModal
          action={modalAction}
          content="You have created account. But you haven't set up your profile yet."
          title={"Attention"}
          setshouldShowModal={setshouldShowModal}
        />
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
