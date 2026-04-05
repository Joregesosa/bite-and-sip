export default class BaseRequest {
  constructor(url, method = "GET", headers = {}, body = null) {
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.body = body;
  }

  /**
   * Sends the HTTP request using the Fetch API and returns the response data as JSON.
   * If the response is not successful, it throws an error with details.
   * @returns {Promise<Object>} - The response data parsed as JSON.
   * @throws {Error} - If the request fails or the response is not successful.
   */
  async send() {
    const options = {
      method: this.method,
      headers: this.headers,
    };

    if (this.body) {
      options.body = JSON.stringify(this.body);
    }

    try {
      const response = await fetch(this.url, options);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(
          `Error ${response.status}: ${errorData.error?.message || response.statusText}`,
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }
}
