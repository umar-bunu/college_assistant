import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import ShowModal from "./ShowModal";

function Layout({ children }) {
  const [shouldShowModal, setshouldShowModal] = useState(false);
  const router = useRouter();
  const [shoudShowNav, setshoudShowNav] = useState(false);
  useEffect(() => {
    setshoudShowNav(router.pathname.split("/").length - 1 > 1 ? false : true);
  }, [router.pathname]);

  return (
    <>
      {shoudShowNav ? <Navbar /> : <></>}

      {shouldShowModal == true && (
        <ShowModal
          action={modalAction}
          content="Account created. Please Login to continue."
          title={"Success"}
          setshouldShowModal={setshouldShowModal}
        />
      )}
      {children}
    </>
  );
}

export default Layout;
