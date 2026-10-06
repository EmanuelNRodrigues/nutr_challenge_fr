import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import { createAppointment } from "./services/appointmentService.js"
import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";


// async function handleSubmit() {
//   try {
//     var appointmentDate = new Date(2026, 11, 1, 9, 59); // December 1, 2026 at 10:00 AM
//     const result = await createAppointment({
//       guest_name: "John Doe",
//       guest_email: "john@example.com",
//       start_appointment_date_time: appointmentDate,
//       nutritionist_email: "test@123.pt",
//       service_name: "service test"
//     });
//
//     console.log("Appointment created:", result);
//   } catch (error) {
//     console.error(error);
//   }
// }


function App() {
  return <RouterProvider router={router} />;

  const [count, setCount] = useState(0)
  return (
    <>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleSubmit()}
          > TESTE 123
        </button>


      {/*<h1 className="text-4xl font-bold text-blue-600">*/}
      {/*  Hello Tailwind!*/}
      {/*</h1>*/}
      {/*<section id="center">*/}
      {/*  <div className="hero">*/}
      {/*    <img src={heroImg} className="base" width="170" height="179" alt="" />*/}
      {/*    <img src={reactLogo} className="framework" alt="React logo" />*/}
      {/*    <img src={viteLogo} className="vite" alt="Vite logo" />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <h1>Get started</h1>*/}
      {/*    <p>*/}
      {/*      Edit <code>src/App.jsx</code> and save to test <code>HMR</code>*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*  <button*/}
      {/*    type="button"*/}
      {/*    className="counter"*/}
      {/*    onClick={() => setCount((count) => count + 1)}*/}
      {/*  >*/}
      {/*    Count is {count}*/}
      {/*  </button>*/}
      {/*</section>*/}

      {/*<div className="ticks"></div>*/}

      {/*<section id="next-steps">*/}
      {/*  <div id="docs">*/}
      {/*    <svg className="icon" role="presentation" aria-hidden="true">*/}
      {/*      <use href="/icons.svg#documentation-icon"></use>*/}
      {/*    </svg>*/}
      {/*    <h2>Documentation</h2>*/}
      {/*    <p>Your questions, answered</p>*/}
      {/*    <ul>*/}
      {/*      <li>*/}
      {/*        <a href="https://vite.dev/" target="_blank">*/}
      {/*          <img className="logo" src={viteLogo} alt="" />*/}
      {/*          Explore Vite*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <a href="https://react.dev/" target="_blank">*/}
      {/*          <img className="button-icon" src={reactLogo} alt="" />*/}
      {/*          Learn more*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*    </ul>*/}
      {/*  </div>*/}
      {/*  <div id="social">*/}
      {/*    <svg className="icon" role="presentation" aria-hidden="true">*/}
      {/*      <use href="/icons.svg#social-icon"></use>*/}
      {/*    </svg>*/}
      {/*    <h2>Connect with us</h2>*/}
      {/*    <p>Join the Vite community</p>*/}
      {/*    <ul>*/}
      {/*      <li>*/}
      {/*        <a href="https://github.com/vitejs/vite" target="_blank">*/}
      {/*          <svg*/}
      {/*            className="button-icon"*/}
      {/*            role="presentation"*/}
      {/*            aria-hidden="true"*/}
      {/*          >*/}
      {/*            <use href="/icons.svg#github-icon"></use>*/}
      {/*          </svg>*/}
      {/*          GitHub*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <a href="https://chat.vite.dev/" target="_blank">*/}
      {/*          <svg*/}
      {/*            className="button-icon"*/}
      {/*            role="presentation"*/}
      {/*            aria-hidden="true"*/}
      {/*          >*/}
      {/*            <use href="/icons.svg#discord-icon"></use>*/}
      {/*          </svg>*/}
      {/*          Discord*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <a href="https://x.com/vite_js" target="_blank">*/}
      {/*          <svg*/}
      {/*            className="button-icon"*/}
      {/*            role="presentation"*/}
      {/*            aria-hidden="true"*/}
      {/*          >*/}
      {/*            <use href="/icons.svg#x-icon"></use>*/}
      {/*          </svg>*/}
      {/*          X.com*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <a href="https://bsky.app/profile/vite.dev" target="_blank">*/}
      {/*          <svg*/}
      {/*            className="button-icon"*/}
      {/*            role="presentation"*/}
      {/*            aria-hidden="true"*/}
      {/*          >*/}
      {/*            <use href="/icons.svg#bluesky-icon"></use>*/}
      {/*          </svg>*/}
      {/*          Bluesky*/}
      {/*        </a>*/}
      {/*      </li>*/}
      {/*    </ul>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/*<div className="ticks"></div>*/}
      {/*<section id="spacer"></section>*/}
    </>
  )
}

export default App
