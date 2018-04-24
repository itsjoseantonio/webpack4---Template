import "../style/index.scss";

import $ from "jquery";
import { TimelineMax, TweenMax } from "gsap";
import test from "./vendor/test";
import ubigeo from "../json/ubigeo.json";
import { fillUbigeo } from "./ubigeo.js";

fillUbigeo(ubigeo, "departamento", "provincia", "distrito");

$("#button").on("click", function() {
    tl
        .to($("#prueba"), 0.5, { opacity: 0.5 })
        .to($("#prueba"), 0.5, { scale: 0.5 })
        .to($("#prueba"), 0.5, { rotation: 360 })
        .to($("#prueba"), 0.5, { opacity: 1 })
        .to($("#prueba"), 0.5, { scale: 1.5 });
});

const tl = new TimelineMax();
test.test();
