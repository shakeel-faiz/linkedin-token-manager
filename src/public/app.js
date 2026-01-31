const params = new URLSearchParams(window.location.search);

const token = params.get("token");
const expires = params.get("expires");

if (token) {
  document.getElementById("result").innerHTML = `
    <p><b>Access Token:</b></p>
    <textarea rows="6" cols="60">${token}</textarea>

    <p>Expires in: ${expires} seconds</p>
  `;
}
