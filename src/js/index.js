import $ from "jquery";
import { TimelineMax, TweenMax } from "gsap";
import "../style/index.scss";
import fakeData from "../json/fakedata.json";
import ubigeo from "../json/ubigeo.json";
import test from "./vendor/test";

import { fillUbigeo } from "./ubigeo.js";

fillUbigeo(ubigeo, "departamento", "provincia", "distrito");

$("#button").on("click", function() {
    tl.to($("#prueba"), 1, { opacity: 0.5 }).to($("#prueba"), 1, { scale: 0.5 });
});

const tl = new TimelineMax();
