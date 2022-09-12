<script lang="ts">
	const char = '𓊝 ';
	let text = char;
	setInterval(() => {
		text = text + char;
		if (text.length > 30) {
			text = char;
		}
	}, 500);
</script>

<div class="text-center text-gray-400">{text}</div>
