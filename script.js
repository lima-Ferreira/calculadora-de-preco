const inputCompra = document.querySelector(".compra");
const inputIpi = document.querySelector(".ipi");
const inputFrete = document.querySelector(".frete");
const inputOutros = document.querySelector(".outros");
const inputBase = document.querySelector(".base");
const inputIcms = document.querySelector(".icms");
const inputPreco1 = document.querySelector(".preco1");
const inputPreco2 = document.querySelector(".preco2");
const inputPreco4 = document.querySelector(".preco4");
const inputMargemPisCofins = document.querySelector(".margem-pis-cofins");
const inputValorPisCofins = document.querySelector(".valor-pis-cofins");
const inputValorCusto = document.querySelector(".valor-custo");

const valorIpi = document.querySelector(".vlr-ipi");
const valorFrete = document.querySelector(".vlr-frete");
const valorOutros = document.querySelector(".vlr-outros");
const valorIcms = document.querySelector(".vlr-icms");
const valorPreco4 = document.querySelector(".vlr-preco4");
const mediaDeCusto = document.querySelector(".media-custo");
const valorCustoAvista = document.querySelector(".custo-avista");
const valorCustoAprazo = document.querySelector(".custo-aprazo");
const valorPisCofinsMedia = document.querySelector(".vlr-pisCofins");
const valorAvista = document.querySelector(".avista");
const valorAprazo = document.querySelector(".aprazo");

let button = document.querySelector(".btn");
let buttonClear = document.querySelector("#btn");

function captureValue() {
  const compra = +inputCompra.value;
  const ipi = +inputIpi.value / 100;
  const frete = +inputFrete.value / 100;
  const outros = +inputOutros.value / 100;
  const base = +inputBase.value / 100;
  const icms = +inputIcms.value / 100;
  const preco1 = +inputPreco1.value / 100;
  const preco2 = +inputPreco2.value / 100;
  const preco4 = +inputPreco4.value / 100;
  const margemPisCofins = +inputMargemPisCofins.value / 100;
  const valorPisCofins = +inputValorPisCofins.value / 100;
  const valorCusto = +inputValorCusto.value / 100;

  return {
    compra,
    ipi,
    frete,
    outros,
    base,
    icms,
    preco1,
    preco2,
    preco4,
    margemPisCofins,
    valorPisCofins,
    valorCusto,
  };
}

document.addEventListener("click", function (e) {
  let eventTarget = e.target;

  if (eventTarget.classList.contains("select")) {
    inputIcms.value = eventTarget.innerText.replace("%", " ").replace(",", ".");
  }
});

function sectionValues(data) {
  const novoIpi = data.compra * data.ipi;
  valorIpi.innerHTML = `<span>R$:</span>  ${novoIpi.toFixed(2)}`;

  const novoFrete = data.compra * data.frete;
  valorFrete.innerHTML = `<span>R$:</span>  ${novoFrete.toFixed(2)}`;

  const novoOutros = data.compra * data.outros;
  valorOutros.innerHTML = `<span>R$:</span>  ${novoOutros.toFixed(2)}`;

  const pisCofins = data.compra * data.margemPisCofins;
  inputValorPisCofins.innerHTML = `<span>R$:</span>  ${pisCofins.toFixed(2)}`;
}

function calcularIcms(data) {
  const valueIpi = data.compra * data.ipi + data.compra;
  const valueFrete = valueIpi * data.frete + valueIpi;
  const valueOutros = valueFrete * data.outros + valueFrete;
  const valueIcms = valueOutros * data.base + valueOutros;
  const novoIcms = valueIcms * data.icms;
  valorIcms.innerHTML = `<span>R$:</span>  ${novoIcms.toFixed(2)}`;

  const custo = valueOutros + novoIcms;
  inputValorCusto.innerHTML = `<span>R$:</span>  ${custo.toFixed(2)}`;

  const precoFiscal = custo * data.preco4 + custo;
  valorPreco4.innerHTML = `<span>R$:</span>   ${precoFiscal.toFixed(2)}`;

  const precoAvista = data.preco1;
  const precoAprazo = data.preco2;
  const pisCofins = data.compra * data.margemPisCofins;

  precoDeCusto(custo, precoAvista, precoAprazo, pisCofins);
}

function precoDeCusto(custo, precoAvista, precoAprazo, pisCofins) {
  const custoAvista = custo * precoAvista + custo;

  const custoAprazo = custo * precoAprazo + custo;

  let iFederal = (custoAvista + custoAprazo) / 2;
  iFederal = (iFederal * 9.25) / 100;

  const impostoFederal = iFederal - pisCofins;
  valorPisCofinsMedia.innerHTML = `<span>R$:</span>  ${impostoFederal.toFixed(
    2
  )}`;

  const custoMedia = impostoFederal + custo;
  mediaDeCusto.innerHTML = `<span>R$:</span>  ${custoMedia.toFixed(2)}`;

  const pAista = custo * precoAvista + custo;
  valorAvista.innerHTML = `<span>R$:</span>   ${pAista.toFixed(2)}`;

  const pAprazo = custo * precoAprazo + custo;
  valorAprazo.innerHTML = `<span>R$:</span>  ${pAprazo.toFixed(2)}`;

  const pisCofinsAvista = (pAista * 9.25) / 100;
  const pisCofinsAprazo = (pAprazo * 9.25) / 100;

  const custoAvistaComPisCpfins = pisCofinsAvista - pisCofins + custo;
  valorCustoAvista.innerHTML = `<span>R$:</span>  ${custoAvistaComPisCpfins.toFixed(
    2
  )}`;

  const custoAprazoComPisCpfins = pisCofinsAprazo - pisCofins + custo;
  valorCustoAprazo.innerHTML = `<span>R$:</span> ${custoAprazoComPisCpfins.toFixed(
    2
  )}`;
}

function clearInputCompra() {
  inputCompra.value = "";
}

function handleClick() {
  sectionValues(captureValue());
  calcularIcms(captureValue());
  clearInputCompra();
}

function handleClearInputs() {
  valorIpi.innerHTML = "";
  valorFrete.innerHTML = "";
  valorOutros.innerHTML = "";
  valorIcms.innerHTML = "";
  valorPreco4.innerHTML = "";
  valorCustoAvista.innerHTML = "";
  valorCustoAprazo.innerHTML = "";
  valorPisCofinsMedia.innerHTML = "";
  mediaDeCusto.innerHTML = "";
  valorAvista.innerHTML = "";
  valorAprazo.innerHTML = "";
}

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    sectionValues(captureValue());
    calcularIcms(captureValue());
    clearInputCompra();
  }
});

button.addEventListener("click", handleClick);
buttonClear.addEventListener("click", handleClearInputs);

const inputsNext = [...document.querySelectorAll("input")];
inputsNext.forEach((next) => {
  next.addEventListener("keyup", function (e) {
    if (e.keyCode === 39) {
      e.preventDefault();
      const previous =
        this.parentNode.nextElementSibling.querySelector("input");
      if (previous) previous.focus();
    }
    if (e.keyCode === 37) {
      e.preventDefault();
      const nextInput =
        this.parentNode.previousElementSibling.querySelector("input");
      if (nextInput) nextInput.focus();
    }
  });
});
