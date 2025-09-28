// ContactForm.jsx
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa";
import "./Contact.css";
const ContactForm = ({ onSubmit = null }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text: '' }

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Enter a valid email.";
    if (!values.subject.trim()) e.subject = "Subject is required.";
    if (!values.message.trim() || values.message.trim().length < 10)
      e.message = "Message required (10+ characters).";
    // phone optional but if present do basic digits check
    if (values.phone && !/^[+\d\s()-]{7,20}$/.test(values.phone))
      e.phone = "Enter a valid phone number.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
    // clear error for this field while typing
    setErrors((s) => ({ ...s, [name]: undefined }));
    setStatus(null);
  };

  const resetForm = () => {
    setValues({ name: "", email: "", phone: "", subject: "", message: "" });
    setErrors({});
  };

  const defaultMailtoSend = () => {
    const subject = `${values.subject} — from ${values.name}`;
    const bodyLines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.phone ? `Phone: ${values.phone}` : null,
      "",
      "Message:",
      values.message,
      "",
      "(Sent from Contact form)",
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${encodeURIComponent(
      ""
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines
    )}`;
    // Try to open mail client
    window.location.href = mailto;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      setStatus({ type: "error", text: "Please fix the highlighted fields." });
      return;
    }

    setBusy(true);
    try {
      if (typeof onSubmit === "function") {
        const result = await onSubmit(values);
        if (result && result.success) {
          setStatus({
            type: "success",
            text: result.message || "Message sent — thank you!",
          });
          resetForm();
        } else {
          setStatus({
            type: "error",
            text: result?.message || "Failed to send message.",
          });
        }
      } else {
        // default behavior: open mail client via mailto
        defaultMailtoSend();
        setStatus({
          type: "success",
          text: "Mail client opened — finish sending from your mail app.",
        });
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        text: "Something went wrong. Try again later.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="contact-wrap">
      <form
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact form"
      >
        <h3 className="contact-title">Contact Me</h3>
        <p className="contact-sub">
          Got an idea or want to collaborate? Send a message — I'll reply soon.
        </p>

        <div className="form-row">
          <label className={`field ${errors.name ? "has-error" : ""}`}>
            <span className="label-icon">
              <FaUser />
            </span>
            <input
              name="name"
              type="text"
              placeholder="Your name *"
              value={values.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
              required
            />
            {errors.name && (
              <small id="err-name" className="error-text">
                {errors.name}
              </small>
            )}
          </label>

          <label className={`field ${errors.email ? "has-error" : ""}`}>
            <span className="label-icon">
              <FaEnvelope />
            </span>
            <input
              name="email"
              type="email"
              placeholder="Email *"
              value={values.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              required
            />
            {errors.email && (
              <small id="err-email" className="error-text">
                {errors.email}
              </small>
            )}
          </label>
        </div>

        <div className="form-row">
          <label className={`field ${errors.phone ? "has-error" : ""}`}>
            <span className="label-icon">
              <FaPhone />
            </span>
            <input
              name="phone"
              type="tel"
              placeholder="Phone (optional)"
              value={values.phone}
              onChange={handleChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "err-phone" : undefined}
            />
            {errors.phone && (
              <small id="err-phone" className="error-text">
                {errors.phone}
              </small>
            )}
          </label>

          <label className={`field ${errors.subject ? "has-error" : ""}`}>
            <span className="label-icon">
              <FaCommentDots />
            </span>
            <input
              name="subject"
              type="text"
              placeholder="Subject *"
              value={values.subject}
              onChange={handleChange}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "err-subject" : undefined}
              required
            />
            {errors.subject && (
              <small id="err-subject" className="error-text">
                {errors.subject}
              </small>
            )}
          </label>
        </div>

        <label
          className={`field field-full ${errors.message ? "has-error" : ""}`}
        >
          <textarea
            name="message"
            placeholder="Your message *"
            rows="6"
            value={values.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "err-message" : undefined}
            required
          />
          {errors.message && (
            <small id="err-message" className="error-text">
              {errors.message}
            </small>
          )}
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={busy}>
            <FaPaperPlane style={{ marginRight: 8 }} />
            {busy ? "Sending..." : "Send Message"}
          </button>

          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              resetForm();
              setStatus(null);
              setErrors({});
            }}
            disabled={busy}
          >
            Clear
          </button>
        </div>

        {status && (
          <div
            role="status"
            className={`form-status ${
              status.type === "success" ? "ok" : "err"
            }`}
          >
            {status.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
