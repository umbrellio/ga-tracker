export const mockXMLHttpRequest = ({ status = 200, data = "" } = {}) => {
  const mock = {
    status,
    response: data,
    open: jest.fn(),
    send: jest.fn(() => {
      status === 200 ? mock.onload() : mock.onerror()
    }),
  }

  window.XMLHttpRequest = jest.fn().mockImplementation(() => mock);

  return mock
}
