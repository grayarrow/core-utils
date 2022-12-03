import { FetchDataTypesAllowed, fetchJson, HttpFetchRequestProps, HttpMethod } from './fetch-http'

// From https://blog.logrocket.com/react-suspense-data-fectching/
// This will prevent a component from rendering until the data is ready.
// It does this by way of throwing the suspender promise.
// <Suspense /> sees a Promise is thrown and it knows to wait.

/**
 * Wraps a Promise waiting for status conditions.
 * Throws the Promise if it is not completed.
 * @param promise A long running Promise to manage pending, success and error states.
 * @returns A read method to be used by Components that are wrapped in <Suspense> and <ErrorBoundary> parent components.
 */
function wrapPromise<TResponse>(promise: Promise<TResponse>): { read: () => TResponse } {
  let status = 'pending'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let response: any

  const suspender = promise.then(
    (res) => {
      status = 'success'
      response = res
    },
    (err) => {
      status = 'error'
      response = err
    }
  )

  const read = (): TResponse => {
    switch (status) {
      case 'pending':
        throw suspender
      case 'error':
        throw response
      default:
        return response
    }
  }

  return { read }
}

/**
 * Wraps a Promise waiting for status conditions via the returned read() method.
 * Throws the Promise if it is not completed so that <Suspense> continues waiting until the Promise if returned cleanly from read().
 * @param param A fetchParams type holding the variables to drive a fetch.
 * @returns A read() method to be used by <Suspense> and <ErrorBoundary> to show components when the data is ready.
 */
export default function fetchData<Tdata extends FetchDataTypesAllowed, Tret>(
  method: HttpMethod,
  { url, data, fname, bearerToken }: HttpFetchRequestProps<Tdata>
) {
  const settings: HttpFetchRequestProps<Tdata> = {
    url,
    data,
    fname,
    bearerToken,
  }
  const promise = fetchJson<Tdata, Tret>(method, settings)

  return wrapPromise(promise)
}
