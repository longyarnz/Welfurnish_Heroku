export default `
	schema {
		query: Query
		mutation: Mutation
	}

	type Query {
		items(options: UpdateItemInput, limit: Int, sort: String): [Item]
		users(options: UserInput, limit: Int, sort: String): [User]
		clients(options: UserInput, limit: Int, sort: String): [User]
		invoices(options: InvoiceInput, limit: Int, sort: String): [Invoice]
	}

	type Item {
		realID: String
		keyID: Int
		title: String
		category: String
		price: Int
		description: String
		src_file: String
		sub: String
		purchased: Boolean
	}

	type User {
		keyID: String
		_name: String!
		email: String!
		phone: Int!
		address: String
		city: String!
		picture_file: String
		work_order: String
		invoice: Invoice
	}

	type Invoice {
		invoice_number: Int!
		items: String!
		cost: Int!
		user: User
	}

	type Mutation {
		CustomOrder(client: UserInput!): User!
		CreateItems(items: [CreateItemInput!]): [Item]
		UpdateItems(items: UpdateItemInput!): [Item]
		MakeRegularOrder(client: UserInput!, invoice: InvoiceInput): MakeRegularOrderPayload
		RemoveEntries(client: UserInput, user: UserInput, item: UpdateItemInput, invoice: InvoiceInput, 
		allItems: Boolean, allUsers: Boolean, allClients: Boolean, allInvoices: Boolean): AllFields
	}

	type AllFields {
		client: Int!
		user: Int!
		item: Int!
		invoice: Int!
	}

	type MakeRegularOrderPayload {
		keyID: String!
		client: User
		invoice: Invoice
	}

	input UserInput {
		_name: String
		email: String
		phone: Float
		address: String
		city: String
		picture_file: String
		work_order: String
	}

	input CreateItemInput {
		realID: String
		keyID: Int
		title: String!
		category: String!
		price: Int!
		description: String!
		src_file: String!
		sub: String!
		purchased: Boolean!
	}

	input UpdateItemInput {
		realID: String
		keyID: Int
		title: String
		category: String
		price: Int
		description: String
		src_file: String
		sub: String
		purchased: Boolean
	}

	input InvoiceInput {
		invoice_number: Int
		items: String
		cost: Int
	}
`;