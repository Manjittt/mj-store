import React from 'react'
import Layout from '../components/layout/Layout'
const About = () => {
  return (
    <Layout title={"About us -  Ecommerce app"}>
      <div className="row aboutus">
        <div className="col-md-6">
          <img
            src="https://static.vecteezy.com/system/resources/previews/039/322/213/non_2x/call-center-worker-using-headset-in-modern-office-receive-calls-from-clients-in-front-of-the-computer-woman-with-phone-calling-to-customer-support-service-concept-flat-illustration-vector.jpg"
            alt="About us"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2 text-gray-700 font-medium leading-relaxed font-weight-700">
            Welcome to E-Shopping! E-Shopping is your one-stop online store,
            offering a wide range of high-quality products at unbeatable prices.
            From fashion to electronics and home essentials, we make shopping
            easy, fast, and convenient. Why E-Shopping? We’re committed to
            providing a seamless shopping experience with secure payment
            options, fast shipping, and hassle-free returns. Our carefully
            curated selection ensures you get the best products every time.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About