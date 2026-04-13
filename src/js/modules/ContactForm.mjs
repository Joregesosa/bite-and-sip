import { WEB3FORMS_KEY, WEB3FORMS_URL } from "../consts.js";
import { qs } from "../utils.js";

/**
 * Handles the contact form in the footer: DOM wiring, validation,
 * and submission via the Web3Forms API.
 */
export default class ContactForm {
  constructor() {
    this.form = qs("#contact-form");
    if (!this.form) return;

    this.submitBtn = qs("#contact-submit", this.form);
    this.submitLabel = qs("#submit-label", this.form);
    this.submitSpinner = qs("#submit-spinner", this.form);
    this.statusEl = qs("#contact-form-status");

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  /**
   * Controls the visual state of the form.
   * @param {"idle"|"loading"|"success"|"error"} state
   * @param {string} [message]
   */
  setState(state, message = "") {
    const baseClass =
      "mt-4 px-4 py-3 rounded-xl text-sm font-medium text-center";

    switch (state) {
      case "loading":
        this.submitBtn.disabled = true;
        this.submitLabel.classList.add("hidden");
        this.submitSpinner.classList.remove("hidden");
        this.submitSpinner.classList.add("flex");
        this.statusEl.className = `hidden ${baseClass}`;
        break;
      case "success":
        this.submitBtn.disabled = false;
        this.submitLabel.classList.remove("hidden");
        this.submitSpinner.classList.add("hidden");
        this.submitSpinner.classList.remove("flex");
        this.statusEl.className = `${baseClass} form-status-success`;
        this.statusEl.textContent = message;
        this.form.reset();
        break;
      case "error":
        this.submitBtn.disabled = false;
        this.submitLabel.classList.remove("hidden");
        this.submitSpinner.classList.add("hidden");
        this.submitSpinner.classList.remove("flex");
        this.statusEl.className = `${baseClass} form-status-error`;
        this.statusEl.textContent = message;
        break;
      default:
        // idle
        this.submitBtn.disabled = false;
        this.submitLabel.classList.remove("hidden");
        this.submitSpinner.classList.add("hidden");
        this.submitSpinner.classList.remove("flex");
        this.statusEl.className = `hidden ${baseClass}`;
    }
  }

  /**
   * Validates the form fields beyond what HTML5 handles.
   * @param {{ name: string, email: string, subject: string, message: string }} fields
   * @returns {string|null} Error message or null if valid.
   */
  validate(fields) {
    if (!fields.name.trim()) return "Please provide your identity.";
    if (!fields.email.trim()) return "Please provide a correspondence address.";
    if (!fields.subject.trim()) return "Please provide a subject matter.";
    if (fields.message.trim().length < 10)
      return "Your message is too brief — a minimum of 10 characters is required.";
    return null;
  }

  /**
   * Sends the form data to the Web3Forms API.
   * @param {{ name: string, email: string, subject: string, message: string }} fields
   * @returns {Promise<{ success: boolean, message: string }>}
   */
  async submitToWeb3Forms(fields) {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name: fields.name,
        email: fields.email,
        subject: fields.subject,
        message: fields.message,
      }),
    });
    return await response.json();
  }

  /**
   * Handles the form submit event.
   * @param {SubmitEvent} e
   */
  async handleSubmit(e) {
    e.preventDefault();

    const fields = {
      name: qs("#contact-name", this.form).value,
      email: qs("#contact-email", this.form).value,
      subject: qs("#contact-subject", this.form).value,
      message: qs("#contact-message", this.form).value,
    };

    const validationError = this.validate(fields);
    if (validationError) {
      this.setState("error", validationError);
      return;
    }

    this.setState("loading");

    try {
      const result = await this.submitToWeb3Forms(fields);
      if (result.success) {
        this.setState("success", "Your message has been dispatched to the atelier.");
      } else {
        this.setState("error", result.message || "Something went awry. Please try again.");
      }
    } catch {
      this.setState("error", "Could not reach the atelier. Check your connection.");
    }
  }

  /**
   * Instantiates and initializes a ContactForm. Intended as a callback
   * for renderWithTemplate after the footer HTML is inserted.
   */
  static init() {
    new ContactForm();
  }
}
