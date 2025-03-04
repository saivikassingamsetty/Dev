export const replaceHTML = (template, products) => {
  const productsContent = products.map(
    ({
      id,
      name,
      color,
      ROM,
      price,
      modelNumber,
      modeName,
      size,
      camera,
      Description,
      productImage,
    }) => {
      let output = template.replace("{{%IMAGE%}}", productImage);
      output = output.replace("{{%NAME%}}", name);
      output = output.replace("{{%MODELNAME%}}", modeName);
      output = output.replace("{{%MODELNO%}}", modelNumber);
      output = output.replace("{{%SIZE%}}", size);
      output = output.replace("{{%CAMERA%}}", camera);
      output = output.replace("{{%PRICE%}}", price);
      output = output.replace("{{%COLOR%}}", color);
      output = output.replace("{{%ID%}}", id);
      output = output.replace("{{%ROM%}}", ROM);
      output = output.replace("{{%DESC%}}", Description);

      return output;
    }
  );

  return productsContent;
};
