"use strict";
let velocity_screen = document.getElementById('velocity_screen');
const simulation_context = velocity_screen.getContext('2d');
function draw_object(canvas, context, center, radius) {
    let centerX = Math.floor(center[0]);
    let centerY = Math.floor(center[1]);
    if (centerX == 300 || centerY == 300) {
        centerX = -centerX;
        centerY = -centerY;
    }
    let r = radius;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(centerX, centerY, r, 0, 2 * Math.PI, false);
    context.fillStyle = 'purple';
    context.fill();
}
function update_coord(coords, v, t, canvas, radius) {
    coords[0] = Math.floor(coords[0] + v[0] * t);
    coords[1] = Math.floor(coords[1] + v[1] * t);
    if (coords[0] - radius < 0) {
        coords[0] = radius;
        v[0] = -v[0];
        v[0] *= 1.2;
    }
    if (coords[0] + radius > canvas.width) {
        coords[0] = canvas.width - radius;
        v[0] = -v[0];
        v[0] *= 1.2;
    }
    if (coords[1] - radius < 0) {
        coords[1] = radius;
        v[1] = -v[1];
        v[1] *= 1.2;
    }
    if (coords[1] + radius > canvas.height) {
        coords[1] = canvas.height - radius;
        v[1] = -v[1];
        v[1] *= 1.2;
    }
}
let start_button = document.getElementById('start_button');
start_button.onclick = function () {
    let velocity_input = document.getElementById("vel");
    let velocity = parseFloat(velocity_input.value);
    let angle_input = document.getElementById("angle");
    let angle = parseFloat(angle_input.value);
    let center = [Math.random() * velocity_screen.width, Math.random() * velocity_screen.height];
    let v = [0, 0];
    let t = 0; // initial time
    let r = 10; //circle radius
    let dt = 500; //time interval (ms)
    v[0] = velocity * Math.cos(Math.PI * angle / 180);
    v[1] = velocity * Math.sin(Math.PI * angle / 180);
    setInterval(function () {
        // coordinate update
        t = (t + dt) / dt;
        update_coord(center, v, t, velocity_screen, r);
        draw_object(velocity_screen, simulation_context, center, r);
    }, dt);
};
