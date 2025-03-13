import React from 'react';

const Crystal: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props} // Usa {...props} en lugar de {...Astro.props}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 330 414"
    className="h-auto w-auto" // Usa className en lugar de class
  >
    <defs>
      <linearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1="168.7244"
        y1="6.1906"
        x2="168.7244"
        y2="397.2586"
      >
        <stop offset="0" style={{ stopColor: '#2EE7FF' }} />
        <stop offset="1" style={{ stopColor: '#7C00FF' }} />
      </linearGradient>
    </defs>
    <g>
      <polygon
        className="a1b2c"
        points="167.15,6.19 16.44,263.28 49.68,332.11 167.6,397.26 296.67,326.02 321.01,263.47"
      ></polygon>
      <g>
        <polygon
          className="d3e4f"
          points="167.15,6.19 13.75,263.01 37.98,325.57 67.18,341.87 96.02,245.02 56.32,315.95 94.24,241.55 73.53,189.54 97.01,236.55"
        ></polygon>
        <polygon
          className="d3e4f"
          points="69.38,343.08 113.35,367.26 132.74,332.25 170.54,11.98 168.64,8.91"
        ></polygon>
        <polygon
          className="d3e4f"
          points="135.31,332.11 167.6,397.26 115.52,368.53"
        ></polygon>
        <polygon
          className="d3e4f"
          points="172.6,393.69 268.22,340.95 222.97,229.27"
        ></polygon>
        <polygon
          className="d3e4f"
          points="268.65,340.77 293.6,327.01 173.35,15.66 164.26,69.5"
        ></polygon>
        <polygon
          className="d3e4f"
          points="321.01,263.47 296.67,326.02 180.5,28.08"
        ></polygon>
        <polygon
          className="d3e4f"
          points="164.78,80.9 158.18,146.21 197.88,213.2 204.42,182.38"
        ></polygon>
        <polygon
          className="d3e4f"
          points="158.18,146.21 148.31,234.47 163.4,364.18 196.89,218.3"
        ></polygon>
        <polygon
          className="d3e4f"
          points="207,187.4 220.2,226.59 170.44,394.17 166.1,383.95"
        ></polygon>
        <polygon
          className="d3e4f"
          points="144.86,238.5 164.78,374.74 136.32,322.8"
        ></polygon>
      </g>
    </g>
  </svg>
);

export default Crystal;