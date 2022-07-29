window.onload = () => {
  const form = document.getElementById("create-form");

  let product_name = document.getElementById("name");
  let product_discount = document.getElementById("discount");
  let product_stock = document.getElementById("stock");
  let product_price = document.getElementById("price");
  let product_desc = document.getElementById("description");
  let product_colors = document.getElementById("colores");
  let product_cat = document.getElementById("categorias");
  let product_img = document.getElementById("image");
  inputs = [
    product_name,
    product_discount,
    product_stock,
    product_price,
    product_desc,
    product_colors,
    product_cat,
  ];
  console.log(inputs)
  
  form.addEventListener("submit", (e) => {
    const errors = [];
    const product_nameValue = product_name.value.trim();
    const product_discountValue = product_discount.value.trim();
    const product_stockValue = product_stock.value.trim();
    const product_priceValue = product_price.value.trim();
    const product_descValue = product_desc.value.trim();
    const product_colorsValue = product_colors.value.trim();
    const product_imgValue = product_img.value;

    if (product_nameValue === "") {
      setErrorFor(product_name, "Este campo no puede estar vacío");
      errors.push("Error en name");
      console.log(errors);
      e.preventDefault();
    } else {
      setSuccessFor(product_name);
      errors.shift();
    }

    if (product_discountValue === "") {
      setSuccessFor(product_discount);
    } else if (product_discountValue <= 0) {
      setErrorFor(product_discount, "Este campo no puede ser menor a 0");
      errors.push("Error en discount");
      console.log(errors);
      e.preventDefault();
    } else if (product_discountValue > 99) {
        setErrorFor(product_discount, "Este campo no puede ser mayor a 99 ");
        errors.push("Error en discount");
        console.log(errors);
        e.preventDefault();
    } else {
      setSuccessFor(product_discount);
      errors.shift();
    }

    if (product_stockValue === "") {
      setErrorFor(product_stock, "Este campo no puede estar vacío");
      errors.push("Error en stock");
      console.log(errors);
      e.preventDefault();
    } else if (product_stockValue <= 0) {
      setErrorFor(product_stock, "Este campo no puede ser menor a 0");
      errors.push("Error en stock(menor o igual a 0)");
      console.log(errors);
      e.preventDefault();
    } else {
      setSuccessFor(product_stock);
      errors.shift();
    }

    if (product_priceValue === "") {
      setErrorFor(product_price, "Este campo no puede estar vacío");
      errors.push("Error en precio");
      console.log(errors);
      e.preventDefault();
    } else if (product_priceValue <= 0) {
      setErrorFor(product_price, "Este campo no puede ser menor a 0");
      errors.push("Error en precio(menor o igual a 0)");
      console.log(errors);
      e.preventDefault();
    } else {
      setSuccessFor(product_price);
      errors.shift();
    }

    if (product_descValue === "") {
      setErrorFor(product_desc, "Este campo no puede estar vacío");
      errors.push("Error en desc");
      console.log(errors);
      e.preventDefault();
    } else if (product_descValue.length < 10) {
      setErrorFor(
        product_desc,
        "Este campo debe contener por lo menos 10 caracteres"
      );
      errors.push("Error en desc(muy corta)");
      console.log(errors);
      e.preventDefault();
    } else {
      setSuccessFor(product_desc);
      errors.shift();
    }

    if (product_colorsValue === "") {
      setErrorFor(product_colors, "Este campo no puede estar vacío");
      errors.push("Error en colors");
      console.log(errors);
      e.preventDefault();
    } else {
      setSuccessFor(product_colors);
      errors.shift();
    }



    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(product_imgValue)) {
      alert("Foto inválida, intente con otro formato");
      e.preventDefault();
    }
    if (errors.length > 0) {
      e.preventDefault();
    }
  });

  function setErrorFor(input, message) {
    const product_control = input.parentElement;
    const small = product_control.querySelector("small");

    small.innerText = message;
    product_control.className = "product_control error";
  }

  function setSuccessFor(input) {
    const product_control = input.parentElement;
    const small = product_control.querySelector("small");
    small.innerText = "";

    product_control.className = "product_control success";
  }
};
