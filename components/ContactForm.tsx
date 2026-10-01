"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const productOptions = [
  "Raised Garden Bed",
  "Metal Privacy Screen",
  "Aluminum Pergola",
  "Garden Shed",
  "Greenhouse",
  "Carport",
  "Aluminum Window",
  "Entry Door",
  "OEM / ODM Project",
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const product = searchParams.get("product");
  const category = searchParams.get("category");
  const link = searchParams.get("link");
  const defaultMessage =
    searchParams.get("message") ||
    (product
      ? [
          `I am interested in your ${product}.`,
          link ? `Product link: ${link}` : "",
          category ? `Category: ${category}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      : "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = (name: string) => String(formData.get(name) || "Not specified");
    const attachment = formData.get("attachment");
    const attachmentName =
      attachment instanceof File && attachment.name ? attachment.name : "None";

    const subject = encodeURIComponent(
      `Website inquiry: ${value("productCategory")}`,
    );
    const body = encodeURIComponent(
      [
        "New website inquiry",
        "",
        `Name: ${value("name")}`,
        `Email: ${value("email")}`,
        `WhatsApp / Phone: ${value("phone")}`,
        `Country: ${value("country")}`,
        `Product Category: ${value("productCategory")}`,
        `Quantity: ${value("quantity")}`,
        "",
        "Message:",
        value("message"),
        "",
        `Selected file: ${attachmentName}`,
        attachmentName === "None"
          ? ""
          : "Please attach this file manually before sending the email.",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href =
      `mailto:Lisa@seeyesgarden.com?subject=${subject}&body=${body}`;
    setStatus("success");
    setMessage(
      "Your email app has opened. Please review and send the inquiry to Lisa.",
    );
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <input name="formType" type="hidden" value="inquiry" />
      <div className="form-row two">
        <label>
          <span>Your Name *</span>
          <input name="name" required placeholder="Your Name" />
        </label>
        <label>
          <span>Email Address *</span>
          <input name="email" required type="email" placeholder="Email Address" />
        </label>
      </div>
      <label>
        <span>WhatsApp / Phone</span>
        <input name="phone" placeholder="WhatsApp / Phone" />
      </label>
      <div className="form-row two">
        <label>
          <span>Country</span>
          <input name="country" placeholder="Country" />
        </label>
        <label>
          <span>Product Category</span>
          <select name="productCategory" defaultValue="">
            <option value="" disabled>
              Product Category
            </option>
            {productOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-row two uneven">
        <label>
          <span>Quantity</span>
          <input name="quantity" placeholder="Quantity" />
        </label>
        <label>
          <span>Message *</span>
          <textarea
            name="message"
            required
            placeholder="Message"
            rows={3}
            defaultValue={defaultMessage}
          />
        </label>
      </div>
      <label className="upload-field">
        <input
          name="attachment"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.pdf,.dwg,.dxf"
          onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name || "")}
        />
        <em>{fileName ? "File Selected" : "Upload File"}</em>
        <strong>Upload Drawing / Reference Image</strong>
        <span>{fileName || "Click to select JPG, PNG, PDF, DWG or DXF"}</span>
      </label>
      <button className="submit-btn" type="submit">
        Submit Inquiry
      </button>
      {message ? <p className={`form-status ${status}`}>{message}</p> : null}
    </form>
  );
}
