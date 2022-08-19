namespace software.ryanmalesic.planogrammer

use aws.auth#sigv4
use aws.protocols#restJson1
use smithy.framework#ValidationException

@title("A magical string manipulation service")

// Cross-origin resource sharing allows resources to be requested from external domains.
// Cors should be enabled for externally facing services and disabled for internally facing services.
// Enabling cors will modify the OpenAPI spec used to define your API Gateway endpoint.
// Uncomment the line below to enable cross-origin resource sharing
// @cors()

@sigv4(name: "execute-api")
@restJson1
service StringWizard {
    version: "2018-05-10",
    operations: [Echo],
}

/// Echo operation that receives input from body.
@http(code: 200, method: "POST", uri: "/echo",)
operation Echo {
    input: EchoInput,
    output: EchoOutput,
    errors: [ValidationException, PalindromeException],
}

structure EchoInput {
    string: String,
}

structure EchoOutput {
    string: String,
}

/// For some reason, this service does not like palindromes!
@httpError(400)
@error("client")
structure PalindromeException {
    message: String,
}