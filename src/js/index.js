import "../style/index.scss";

import $ from "jquery";
import { TimelineMax, TweenMax } from "gsap";
import test from "./vendor/test";
import ubigeo from "../json/ubigeo.json";
import { fillUbigeo } from "./ubigeo.js";

fillUbigeo(ubigeo, "departamento", "provincia", "distrito");

$("#button").on("click", function() {
    tl.to($("#prueba"), 1, { opacity: 0.5 }).to($("#prueba"), 1, { scale: 0.5 });
});

const tl = new TimelineMax();
test.test();
