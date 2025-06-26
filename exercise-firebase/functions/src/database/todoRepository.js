const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const collection =  db.collection("todos");

async function getTodos(limit, sort) {
    let query = collection;
    if (sort === 'asc' || sort === 'desc') {
        query = collection.orderBy('createdAt', sort);
    }

    if (limit) {
        query = query.limit(parseInt(limit));
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

/**
 * @param data
 */
async function addTodo(data) {
    const created = await collection.add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return created.id;
}

/**
 * @param id
 * @param newData
 */
async function updateTodo(id, newData) {
    await collection.doc(id).update({
        ...newData,
        updatedAt: new Date()
    });

    return id;
}

/**
 * @param id
 */
async function deleteTodo(id) {
    await collection.doc(id).delete();

    return id;
}

async function updateBulkTodos(updates) {
    if (!Array.isArray(updates) || updates.length === 0) return;

    const batch = collection.firestore.batch();
    updates.forEach(update => {
        const { docId, ...updateData } = update;
        const docRef = collection.doc(docId);
        batch.update(docRef, {
            ...updateData,
            updatedAt: new Date()
        });
    });

    await batch.commit();
}

async function deleteBulkTodos(todoDocIds) {
    if (!Array.isArray(todoDocIds) || todoDocIds.length === 0) return;

    const batch = db.batch();
    todoDocIds.forEach(id => {
        const docRef = collection.doc(id);
        batch.delete(docRef);
    });

    await batch.commit();
}

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    updateBulkTodos,
    deleteBulkTodos
};