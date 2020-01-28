import React from "react";
import Container from "react-particles-js";
const Particles = props => {
  const isLaptop = props.type === "laptop";
  return (
    <div className="particles-js">
      <Container
        params={JSON.parse(`{
        "particles": {
          "number": {
            "value": ${isLaptop ? "20" : "20"},
            "density": {
              "enable": true,
              "value_area": ${isLaptop ? "500" : "1000"}
            }
          },
          "color": {
            "value": "#000000"
          },
          "shape": {
            "type": "${isLaptop ? "edge" : "circle"}",
            "stroke": {
              "width": ${isLaptop ? "0" : "1"},
              "color": "#ffffff"
            },
            "polygon": {
              "nb_sides": 4
            }
          },
          "opacity": {
            "value": ${
              isLaptop ? (props.dm ? "0.045" : "0.015") : "0.2288528160"
            },
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": ${isLaptop ? "150" : "4.945738208161363"},
            "random": true,
            "anim": {
              "enable": false,
              "speed": 100,
              "size_min": ${isLaptop ? "50" : "0.1"},
              "sync": false
            }
          },
          "line_linked": {
            "enable": ${isLaptop ? "false" : "true"},
            "distance": 94.69771699587272,
            "color": "#3b416e",
            "opacity": 0.1683582663908799,
            "width": 1.763753266952075
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "${isLaptop ? "none" : "top"}",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": ${isLaptop ? "false" : "true"},
              "mode": "repulse"
            },
            "onclick": {
              "enable": ${isLaptop ? "true" : "false"},
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 150,
              "line_linked": {
                "opacity": ${isLaptop ? "0" : "1"}
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": ${isLaptop ? "1" : "5"},
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      }`)}
      />
    </div>
  );
};
export default Particles;
