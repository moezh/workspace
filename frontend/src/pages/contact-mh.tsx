import Head from "next/head";

export default function Page(props: { data: string }) {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <h1 className="font-medium text-center text-xl uppercase">
        Get In Touch
      </h1>
      <div className="text-justify">
        <br />
        <p>
          Are you seeking professional assistance with rapid prototyping,
          application development, or digital product strategy? I am here to
          offer my expertise. I am available to communicate with you regarding
          any projects, ideas, or questions you may have. Please do not hesitate
          to reach out to me. You may contact me through email, message me on
          WhatsApp, connect with me on LinkedIn or schedule a Zoom meeting with
          me by clicking the buttons below. Rest assured that I will respond
          promptly to your inquiries. Thank you for considering my services.
        </p>
      </div>
      <br />
      <div className="w-full flex flex-row items-center justify-center text-center">
        <div className="w-1/4 flex flex-col items-center justify-center">
          <a target="_blank" href="mailto:moez.hachicha@icloud.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-10 h-10 mx-auto"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
            <div>Email</div>
          </a>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center">
          <a target="_blank" href="https://wa.me/21655334476">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-10 h-10 mx-auto"
            >
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
            </svg>
            <div>WhatApp</div>
          </a>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center">
          <a target="_blank" href="https://www.linkedin.com/in/moez-hachicha/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 448 512"
              className="w-10 h-10 mx-auto"
            >
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
            </svg>
            <div>LinkedIn</div>
          </a>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center">
          <a target="_blank" href="https://calendly.com/moezh/30min">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-10 h-10 mx-auto"
            >
              <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2Zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1.202Z" />
            </svg>
            <div>Zoom</div>
          </a>
        </div>
      </div>
      <br />
    </>
  );
}
