import React from "react";

function Subscribe() {
  return (
    <>
      <section>
        <div>
          <h2>Subscribe to our newsletter</h2>
          <div>
            <div>
              <label htmlFor="name"></label>
              <input type="text" id="name" name="name" value="First name" />
            </div>
            <div>
              <label htmlFor="email"></label>
              <input
                type="text"
                id="email"
                name="email"
                value="Email address"
              />
            </div>
            <button>Subscribe Now</button>
          </div>
          <div></div>
        </div>
      </section>
    </>
  );
}

export default Subscribe;
