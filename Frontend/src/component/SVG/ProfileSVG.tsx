const ProfileSVG = () => {
  return (
    <button type="button" aria-label="Logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="62"
        height="62"
        viewBox="0 0 62 62"
        fill="none"
      >
        <circle cx="31" cy="31" r="31" fill="white" />
        <circle cx="31" cy="31" r="31" fill="#8C69F1" />
        <mask
          id="mask0_423_945"
          style={{ maskType: 'alpha' } as React.CSSProperties}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="62"
          height="62"
        >
          <circle cx="31" cy="31" r="31" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_423_945)">
          <path
            d="M32.0804 46.2019H22.2001C19.6122 46.2019 17 44.2362 17 39.8473V31.1111C17.0364 27.1281 18.5278 23.2958 21.1933 20.336C23.8588 17.3761 27.5145 15.4929 31.472 15.0409C33.7052 14.8788 35.9471 15.1993 38.0455 15.9807C40.1438 16.7621 42.0493 17.986 43.6326 19.5693C45.2159 21.1525 46.4398 23.0581 47.2212 25.1564C48.0025 27.2547 48.323 29.4967 48.1609 31.7299C47.7084 35.689 45.8236 39.3459 42.8616 42.0115C39.8997 44.6772 36.0651 46.1676 32.0804 46.2019Z"
            fill="white"
          />
          <circle cx="34.1601" cy="28.5205" r="2.08005" fill="#8C69F1" />
          <path
            d="M32.0801 34.7607C32.0922 38.6205 44.5514 38.6458 44.5604 34.7607C44.5604 39.8569 39.6203 39.4322 38.3202 39.4322C37.0202 39.4322 32.0801 39.4322 32.0801 34.7607Z"
            fill="#8C69F1"
          />
          <circle cx="42.4804" cy="28.5205" r="2.08005" fill="#8C69F1" />
        </g>
      </svg>
    </button>
  );
};

export default ProfileSVG;
