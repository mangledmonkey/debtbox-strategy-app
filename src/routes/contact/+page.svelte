<script>
	let name = '';
	let email = '';
	let subject = '';
	let message = '';

	function handleSubmit(event) {
		event.preventDefault();
		// You can add your form submission logic here
		console.log({ name, email, subject, message });
		alert('Your message has been sent!');
		// Clear the form fields
		name = '';
		email = '';
		subject = '';
		message = '';
	}
</script>

<main class="min-h-screen bg-surface-100 py-10 text-neutral-content">
	<div class="container mx-auto px-4">
		<h1 class="mb-6 text-center text-4xl font-bold text-primary">Contact Us</h1>
		<p class="mb-8 text-center text-lg">
			If you have any questions or need assistance, please fill out the form below, and we will get
			back to you as soon as possible.
		</p>
		<form on:submit={handleSubmit} class="mx-auto max-w-2xl">
			<div class="mb-4">
				<label for="name" class="mb-2 block text-lg">Name</label>
				<input
					type="text"
					id="name"
					bind:value={name}
					required
					class="w-full rounded bg-surface-200 px-4 py-2 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75"
				/>
			</div>
			<div class="mb-4">
				<label for="email" class="mb-2 block text-lg">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="w-full rounded bg-surface-200 px-4 py-2 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75"
				/>
			</div>
			<div class="mb-4">
				<label for="subject" class="mb-2 block text-lg">Subject</label>
				<input
					type="text"
					id="subject"
					bind:value={subject}
					required
					class="w-full rounded bg-surface-200 px-4 py-2 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75"
				/>
			</div>
			<div class="mb-4">
				<label for="message" class="mb-2 block text-lg">Message</label>
				<textarea
					id="message"
					bind:value={message}
					required
					rows="6"
					class="w-full rounded bg-surface-200 px-4 py-2 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75"
				></textarea>
			</div>
			<button
				type="submit"
				class="hover:bg-primary-dark w-full rounded bg-primary px-6 py-2 text-neutral-content focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75"
			>
				Send Message
			</button>
		</form>
	</div>
</main>

<style>
	/* Add any additional styles here */
</style>
