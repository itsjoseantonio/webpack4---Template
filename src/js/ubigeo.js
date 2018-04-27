module.exports = {
  fillUbigeo: function Ubigeo(
    dataUbigeo,
    idDepartamento,
    idProvincia,
    idDistrito,
    texto = 'Seleccione',
  ) {
    const ubigeoData = new Promise((resolve, reject) => {
      resolve(dataUbigeo);
    }).then((data) => {
      const selectDepartamento = document.getElementById(idDepartamento);
      const selectProvincia = document.getElementById(idProvincia);
      const selectDistrito = document.getElementById(idDistrito);
      let selectDepartamentoValue = '';
      selectDepartamento.insertAdjacentHTML(
        'afterbegin',
        `<option>${texto}</option>`,
      );
      selectProvincia.insertAdjacentHTML(
        'afterbegin',
        `<option>${texto}</option>`,
      );
      selectDistrito.insertAdjacentHTML(
        'afterbegin',
        `<option>${texto}</option>`,
      );
      for (const index in data) {
        selectDepartamento.insertAdjacentHTML(
          'beforeend',
          `<option value="${data[index].idDepart}">${
            data[index].nomDepart
          }</option>`,
        );
      }

      selectDepartamento.addEventListener('change', (el) => {
        selectDepartamentoValue = parseInt(el.currentTarget.value) - 1;
        selectProvincia
          .querySelectorAll('option')
          .forEach((e) => e.parentNode.removeChild(e));
        selectDistrito
          .querySelectorAll('option')
          .forEach((e) => e.parentNode.removeChild(e));
        selectProvincia.insertAdjacentHTML(
          'afterbegin',
          `<option>${texto}</option>`,
        );
        selectDistrito.insertAdjacentHTML(
          'afterbegin',
          `<option>${texto}</option>`,
        );
        const provincias =
          data[parseInt(el.currentTarget.value) - 1].provincias;
        for (const index in provincias) {
          selectProvincia.insertAdjacentHTML(
            'beforeend',
            `<option value="${provincias[index].idProvincia}">${
              provincias[index].nomProvincia
            }</option>`,
          );
        }
      });

      selectProvincia.addEventListener('change', (el) => {
        selectDistrito
          .querySelectorAll('option')
          .forEach((el) => el.parentNode.removeChild(el));
        selectDistrito.insertAdjacentHTML(
          'afterbegin',
          `<option>${texto}</option>`,
        );
        const distritos =
          data[selectDepartamentoValue].provincias[
            parseInt(el.currentTarget.value) - 1
          ].distritos;
        for (const index in distritos) {
          selectDistrito.insertAdjacentHTML(
            'beforeend',
            `<option value="${distritos[index].idDistrito}">${
              distritos[index].nomDistrito
            }</option>`,
          );
        }
      });
    });
  },
};
