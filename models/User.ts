
/**
 * This file represents a Mongoose schema for an Investment Project.
 * This structure centralizes all financial data and links investors
 * to a specific project.
 * 
 * Example Backend Usage:
 * 
 * import { Schema, model, Types } from 'mongoose';
 * 
 * // A sub-document schema for individual investments within a project.
 * const investmentSchema = new Schema({
 *   // This links to the _id of a document in the 'User' collection.
 *   // It ensures that only registered users with the 'investor' role can be added.
 *   investorId: { 
 *      type: Types.ObjectId, 
 *      ref: 'User', 
 *      required: true 
 *   },
 *   name: {
 *      type: String,
 *      required: true
 *   },
 *   amount: { 
 *      type: Number, 
 *      required: true, 
 *      min: 0 
 *   },
 * }, { _id: false }); // No separate _id for sub-documents
 * 
 * const projectSchema = new Schema({
 *   name: { 
 *     type: String, 
 *     required: true, 
 *     default: 'Main Investment Project' 
 *   },
 *   cost: { 
 *     type: Number, 
 *     required: true, 
 *     default: 0 
 *   },
 *   sellPrice: { 
 *     type: Number, 
 *     required: true, 
 *     default: 0 
 *   },
 *   currency: { 
 *     type: String, 
 *     required: true, 
 *     default: 'USD' 
 *   },
 *   // An array of investments, following the structure defined above.
 *   investors: [investmentSchema],
 * }, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps
 * 
 * export const ProjectModel = model('Project', projectSchema);
 * 
 */

// This file is for structural reference in the frontend application.
export {};
