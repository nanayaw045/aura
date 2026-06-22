# Aura API Documentation

All API endpoints require the `aura_token` cookie (except auth endpoints). Responses are JSON.

## Authentication Endpoints

### POST /api/auth/signup
Create a new user account.

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "companyName": "Acme Corp",
  "industry": "Technology",
  "country": "United States",
  "city": "San Francisco",
  "revenueRange": "$1M-$10M",
  "goals": ["Growth", "Efficiency"]
}
```

**Response (200)**
```json
{
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "company_name": "Acme Corp",
    "role": "user"
  }
}
```

**Error Responses**
- `400`: Required fields missing
- `409`: Email already registered

---

### POST /api/auth/login
Authenticate user and create session.

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200)**
```json
{
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "company_name": "Acme Corp",
    "role": "user"
  }
}
```

Sets `aura_token` cookie (HttpOnly, 7-day expiration).

**Error Responses**
- `400`: Email or password missing
- `401`: Invalid credentials

---

### POST /api/auth/logout
Clear user session.

**Request Body**
```json
{}
```

**Response (200)**
```json
{
  "success": true
}
```

Clears `aura_token` cookie.

---

## Dashboard Endpoints

*All require valid `aura_token` cookie*

### POST /api/deep-dive
Run business analysis with AI-powered insights.

**Request Body**
```json
{
  "query": "What should we do to improve profitability?"
}
```

**Response (200)**
```json
{
  "analysis": {
    "scores": [
      {
        "label": "Market Position",
        "value": "88%",
        "description": "Strong market differentiation and premium segment alignment."
      },
      {
        "label": "Financial Health",
        "value": "79%",
        "description": "Margins are healthy but can improve with premium pricing and cost control."
      },
      {
        "label": "Operational Efficiency",
        "value": "85%",
        "description": "Processes are streamlined, with room for automation in recurring workflows."
      },
      {
        "label": "Risk Assessment",
        "value": "62%",
        "description": "Concentration and execution risk should be monitored closely."
      }
    ],
    "swot": [
      {
        "title": "Strengths",
        "items": ["Premium product positioning", "High customer retention", "Strong leadership focus on growth"]
      },
      {
        "title": "Weaknesses",
        "items": ["Customer concentration in key accounts", "Manual reporting overhead", "Limited automation across workflows"]
      },
      {
        "title": "Opportunities",
        "items": ["Upsell premium services", "Target geographic expansion", "Improve cross-sell revenue"]
      },
      {
        "title": "Threats",
        "items": ["Macroeconomic pressure", "Emerging competitive offerings", "Resource capacity constraints"]
      }
    ],
    "recommendations": [
      {
        "title": "Align pricing with premium bundles",
        "detail": "Introduce tiered packages that reflect value and increase average contract value without compromising retention."
      },
      {
        "title": "Optimize spend on high ROI channels",
        "detail": "Reallocate marketing and sales resources toward segments that deliver faster close rates and higher margin deals."
      },
      {
        "title": "Automate repetitive finance workflows",
        "detail": "Implement automated reporting to reduce manual review time and surface decision-grade metrics faster."
      }
    ]
  }
}
```

**Error Responses**
- `400`: Query missing
- `401`: Unauthorized (invalid/missing token)

---

### POST /api/chat
Chat with business advisor.

**Request Body**
```json
{
  "message": "How can we improve profit margins?"
}
```

**Response (200)**
```json
{
  "message": "Focus on high-margin products and upsell services with clear ROI for premium buyers."
}
```

The API analyzes keywords in the message and provides contextual business advice. It also saves the conversation to the database.

**Error Responses**
- `400`: Message missing or not a string
- `401`: Unauthorized (invalid/missing token)

---

### POST /api/onboarding
Complete onboarding flow and update user profile.

**Request Body**
```json
{
  "businessName": "Acme Corp",
  "industry": "Technology",
  "country": "United States",
  "city": "San Francisco",
  "revenueRange": "$1M-$10M",
  "goals": ["Growth", "Efficiency", "Market Expansion"]
}
```

**Response (200)**
```json
{
  "success": true
}
```

Updates user record and sets health_score to 88 on completion.

**Error Responses**
- `400`: Required fields missing
- `401`: Unauthorized (invalid/missing token)

---

## Session Management

### Cookie Format
```
aura_token: <JWT_TOKEN>
HttpOnly: true
SameSite: Lax
Path: /
MaxAge: 604800 (7 days)
```

### JWT Payload
```json
{
  "userId": 1,
  "email": "john@example.com",
  "iat": 1687456000,
  "exp": 1688060800
}
```

### Token Verification
- Signed with SHA256 hash of `DATABASE_URL` or `JWT_SECRET`
- Expires after 7 days
- Included in `aura_token` cookie automatically
- Validated on protected route access via middleware

---

## Error Handling

All endpoints return error responses in this format:

```json
{
  "error": "Description of what went wrong"
}
```

### Status Codes
- `200`: Success
- `400`: Bad request (validation error)
- `401`: Unauthorized (missing/invalid token)
- `409`: Conflict (email already exists)
- `500`: Server error (database or internal)

---

## Rate Limiting

No built-in rate limiting currently implemented. Consider adding for production:
- 100 requests per minute per IP
- 50 requests per minute per user (authenticated)

---

## CORS

API routes run on same domain (Netlify). No explicit CORS configuration needed.

For development (localhost testing):
- Frontend: `http://localhost:3000`
- API: Same domain (same-origin requests)

---

## Data Validation

### Email
- Must be valid format (RFC 5322)
- Checked for existing user before signup

### Password
- Minimum 8 characters (consider enforcing client-side)
- Hashed with bcryptjs before storage

### Tokens
- 7-day expiration
- Signed with consistent secret
- Verified on each protected endpoint

---

## Future Enhancements

- [ ] Rate limiting per user
- [ ] Request logging and monitoring
- [ ] Webhook support for external integrations
- [ ] GraphQL alternative to REST
- [ ] Real AI analysis (currently rule-based)
- [ ] Stripe webhook handling
- [ ] OAuth2 social login
