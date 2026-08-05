# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| Latest (`main` branch) | ✅ |
| Older commits | ❌ |

## Reporting a Vulnerability

If you discover a security vulnerability in TravelScape, please report it responsibly.

**⚠️ Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please contact the maintainer directly:

- **GitHub**: [@mariemkhouni67](https://github.com/mariemkhouni67)

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 7 days
- **Fix & Disclosure**: As soon as a patch is available

## Security Best Practices

When contributing to or deploying TravelScape, please follow these guidelines:

1. **Never commit secrets**: Keep `.env` files, API keys, and tokens out of version control
2. **Use environment variables**: All sensitive configuration should use environment variables
3. **Keep dependencies updated**: Regularly run `npm audit` and update packages
4. **Use HTTPS**: Always deploy with HTTPS enabled in production
5. **Validate inputs**: All user inputs should be validated on both client and server

## Acknowledgments

We appreciate the security research community and thank anyone who reports vulnerabilities responsibly.
