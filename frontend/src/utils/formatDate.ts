export default function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('pt-br');
}